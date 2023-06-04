// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
//#ifndef _CYCGRP_H_
//#define _CYCGRP_H_ 1
#include <string.h>
#include <openssl/ec.h>
extern BN_CTX *bn_ctx;
extern int Order_bits;
int group_init (int type);
extern EC_GROUP *ec_group;

typedef struct
{
  EC_POINT *P;
} CycGrpG;
typedef struct
{
  BIGNUM *B;
} CycGrpZp;
extern CycGrpZp Order;


extern CycGrpG *CycGrpGenerator;
void CycGrpZp_copy (CycGrpZp * a, const CycGrpZp * b);
void CycGrpG_copy (CycGrpG * a, const CycGrpG * b);
char *CycGrpZp_toHexString (const CycGrpZp * a);
int CycGrpZp_fromHexString (CycGrpZp * x, const char *s);
char *CycGrpG_toHexString (const CycGrpG * a);
char *CycGrpG_toHexStringUncompressed (const CycGrpG * a);
int CycGrpG_fromHexString (CycGrpG * g, const char *s);
int
CycGrpG_deserialize (CycGrpG * g, const unsigned char *buf,
		     size_t maxBufSize);
void CycGrpG_serialize (unsigned char *buf, size_t maxBufSize,
			const CycGrpG * g);
int CycGrpZp_isEqual (const CycGrpZp * x, const CycGrpZp * y);
void CycGrpZp_add (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y);
void CycGrpZp_mul (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y);
void CycGrpZp_inverse (CycGrpZp * z, const CycGrpZp * x);
int CycGrpG_isEqual (const CycGrpG * h, const CycGrpG * g);
void CycGrpG_add (CycGrpG * h, const CycGrpG * u, const CycGrpG * v);
void CycGrpZp_sub (CycGrpZp * z, const CycGrpZp * x, const CycGrpZp * y);
void CycGrpG_mul (CycGrpG * h, const CycGrpG * g, const CycGrpZp * x);
void
CycGrpZp_serialize (unsigned char *buf, size_t maxBufSize,
		    const CycGrpZp * x);
int CycGrpZp_setRand (CycGrpZp * x);
int CycGrpZp_deserialize (CycGrpZp * x, unsigned const char *buf, size_t len);
void CycGrpG_new (CycGrpG * g);
void CycGrpZp_new (CycGrpZp * x);
void CycGrpZp_copy (CycGrpZp * a, const CycGrpZp * b);
void CycGrpG_copy (CycGrpG * a, const CycGrpG * b);
char *CycGrpZp_toHexString (const CycGrpZp * a);	// convert point in Hex string. When CYC_GRP_BLS_G1=1 the representation is like the one described here:
// https://github.com/herumi/mcl/blob/master/api.md for ioMode=16. Otherwise, it uses the serialization of openssl. The strings are always terminated by the null character '\0'.
char *CycGrpG_toHexString (const CycGrpG * a);
size_t CycGrpG_toBin (unsigned char *dst, size_t len, const CycGrpG * a);
char *CycGrpG_toHexStringUncompressed (const CycGrpG * a);
int CycGrpZp_fromHexString (CycGrpZp * x, const char *s);
int CycGrpG_fromHexString (CycGrpG * a, const char *s);
void generate_secret_key (CycGrpZp * sk);
void generate_public_key (CycGrpG * PK, const CycGrpZp * sk);

//#endif
