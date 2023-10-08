// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

CycGrpG *CycGrpGenerator;
#include <openssl/ec.h>
#include <openssl/ecdh.h>
#include <openssl/obj_mac.h>
BN_CTX *bn_ctx;
EC_GROUP *ec_group = NULL;
int Order_bits;
CycGrpZp Order;
unsigned char buf_for_serializing[1024];
int
group_init (int curve_type)
{
  ec_group = EC_GROUP_new_by_curve_name (curve_type);
  if (ec_group == NULL)
    {
      printf ("err in initializing the group\n");
      return 1;
    }
  CycGrpGenerator = (CycGrpG *) malloc (sizeof (CycGrpG));
  CycGrpGenerator->P = EC_POINT_new (ec_group);

  EC_POINT_copy (CycGrpGenerator->P, EC_GROUP_get0_generator (ec_group));
  bn_ctx = BN_CTX_new ();

  Order.B = BN_new ();
  if (!EC_GROUP_get_order (ec_group, Order.B, NULL))
    return 1;
  Order_bits = BN_num_bits (Order.B);
  //ComputeLagrangeCoeff ();
  return 0;
}

void
generate_public_key (CycGrpG * PK, const CycGrpZp * sk)
{
  CycGrpG_new (PK);
  CycGrpG_mul (PK, CycGrpGenerator, sk);
}

void
generate_secret_key (CycGrpZp * sk)
{
  CycGrpZp_new (sk);
  CycGrpZp_setRand (sk);
}


void
CycGrpZp_copy (CycGrpZp * a, const CycGrpZp * b)
{
  CycGrpZp_serialize (buf_for_serializing, sizeof (buf_for_serializing), b);
  CycGrpZp_deserialize (a, buf_for_serializing, sizeof (buf_for_serializing));
}

void
CycGrpG_copy (CycGrpG * a, const CycGrpG * b)
{

  CycGrpG_serialize (buf_for_serializing, sizeof (buf_for_serializing), b);
  CycGrpG_deserialize (a, buf_for_serializing, sizeof (buf_for_serializing));
}

char *
CycGrpZp_toHexString (const CycGrpZp * a)
{
  char *s;
  s = BN_bn2hex (a->B);
  return s;
}

int
CycGrpZp_fromHexString (CycGrpZp * x, const char *s)
{
  return CycGrpZp_deserialize (x, (unsigned char *) s, strlen (s));
}

char *
CycGrpG_toHexString (const CycGrpG * a)
{
  char *s;
  s = EC_POINT_point2hex (ec_group, a->P, POINT_CONVERSION_COMPRESSED, NULL);
  return s;
}

size_t
CycGrpG_toBin (unsigned char *dst, size_t len, const CycGrpG * a)
{
  return EC_POINT_point2oct (ec_group, a->P, POINT_CONVERSION_COMPRESSED, dst,
			     len, NULL);
}

char *
CycGrpG_toHexStringUncompressed (const CycGrpG * a)
{
  char *s;
  s =
    EC_POINT_point2hex (ec_group, a->P, POINT_CONVERSION_UNCOMPRESSED, NULL);
  return s;
}

int
CycGrpG_fromHexString (CycGrpG * g, const char *s)
{
  return CycGrpG_deserialize (g, (unsigned char *) s, strlen (s));
}

int
CycGrpG_deserialize (CycGrpG * g, const unsigned char *buf, size_t maxBufSize)	// hex2point return 0 on error and 1 on success but we return 0 on success and -1 on error
{
  if (!EC_POINT_hex2point (ec_group, (const char *) buf, g->P, NULL))
    return -1;
  return 0;
}

void
CycGrpG_serialize (unsigned char *buf, size_t maxBufSize, const CycGrpG * g)
{
  strcpy ((char *) buf,
	  (char *) EC_POINT_point2hex (ec_group, g->P,
				       POINT_CONVERSION_COMPRESSED, NULL));
}

int
CycGrpZp_isEqual (const CycGrpZp * x, const CycGrpZp * y)
{
  return !BN_cmp (x->B, y->B);
}

void
CycGrpZp_add (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y)
{
  BN_mod_add (z->B, x->B, y->B, Order.B, bn_ctx);
}

void
CycGrpZp_mul (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y)
{
  BN_mod_mul (z->B, x->B, y->B, Order.B, bn_ctx);
}

void
CycGrpZp_inverse (CycGrpZp * z, const CycGrpZp * x)
{
  BN_mod_inverse (z->B, x->B, Order.B, bn_ctx);
}

int
CycGrpG_isEqual (const CycGrpG * h, const CycGrpG * g)
{
  return !EC_POINT_cmp (ec_group, h->P, g->P, NULL);
}

void
CycGrpG_add (CycGrpG * h, const CycGrpG * u, const CycGrpG * v)
{
  EC_POINT_add (ec_group, h->P, u->P, v->P, NULL);
}

void
CycGrpG_invert (CycGrpG * h, const CycGrpG * u)
{
  EC_POINT_invert (ec_group, h->P, NULL);
}

void
CycGrpZp_sub (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y)
{
  BN_mod_sub (z->B, x->B, y->B, Order.B, bn_ctx);
}

void
CycGrpG_mul (CycGrpG * h, const CycGrpG * g, const CycGrpZp * x)
{
  EC_POINT_mul (ec_group, h->P, NULL, g->P, x->B, NULL);
}

void
CycGrpZp_serialize (unsigned char *buf, size_t maxBufSize, const CycGrpZp * x)
{
  strcpy ((char *) buf, (char *) BN_bn2hex (x->B));
}

int
CycGrpZp_setRand (CycGrpZp * x)
{
  BN_rand (x->B, Order_bits, 0, Order_bits - 1);
  return 0;
}

int
CycGrpZp_deserialize (CycGrpZp * x, unsigned const char *buf, size_t len)	// hex2bin return 0 on error and 1 on success but we return 0 on success and -1 otherwise
{
  if (!BN_hex2bn (&(x->B), (const char *) buf))
    return -1;
  return 0;
}

void
CycGrpG_new (CycGrpG * g)
{
  g->P = EC_POINT_new (ec_group);
}

void
CycGrpZp_new (CycGrpZp * x)
{
  x->B = BN_new ();
}

extern CycGrpG *CycGrpGenerator;
