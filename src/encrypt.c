// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdio.h>
#include <openssl/sha.h>
static SHA256_CTX ctx;
#define LENGTH_GRP_ELEMENTS 33	// 33 for secp256k1 = 32 + 1 byte for the sign. This is the length in binary. The length as hex string is then the double

inline static void
print_hex (unsigned char *hex, size_t len)
{
  size_t count;
  printf ("0x");
  for (count = 0; count < len; count++)
    printf ("%02x", hex[count]);
  printf ("\n");
}

inline static void
HexToBytes (unsigned char *dst, unsigned char *src)
{

  size_t count;
  for (count = 0; count < LENGTH_GRP_ELEMENTS; count++)
    {
      sscanf ((char *) src, "%2hhx", &dst[count]);
      src += 2;
    }
//print_hex(val,LENGTH_GRP_ELEMENTS);
}

int
main (int argc, char **argv)
{
  int i;
  unsigned char B[SHA256_DIGEST_LENGTH];
  unsigned char tmp[SHA256_DIGEST_LENGTH];
  unsigned char tmp2[SHA256_DIGEST_LENGTH];
  unsigned char Cbytes[LENGTH_GRP_ELEMENTS * 2];
  unsigned char Addrbytes[LENGTH_GRP_ELEMENTS * 2];
  if (argc < 3)
    {
      printf
	("Usage of %s:\n%s PK addr\nPK: public key of the DAO to which make the deposit \naddr: address of the DAO\n",
	 argv[0], argv[0]);
      exit (1);
    }

  CycGrpZp r;
  CycGrpG PK, A, C;
  group_init (714);
  CycGrpZp_new (&r);
  CycGrpG_new (&PK);
  CycGrpG_new (&A);
  CycGrpG_new (&C);
  CycGrpG_fromHexString (&PK, argv[1]);
  CycGrpZp_setRand (&r);
  CycGrpG_mul (&A, CycGrpGenerator, &r);
  CycGrpG_mul (&C, &PK, &r);
  printf ("A:0x%s\n", CycGrpG_toHexString (&A));
  SHA256_Init (&ctx);
  HexToBytes (Cbytes, (unsigned char *) CycGrpG_toHexString(&C));
  SHA256_Update (&ctx, (unsigned char *) Cbytes, LENGTH_GRP_ELEMENTS);
  SHA256_Final (tmp, &ctx);
  HexToBytes (Addrbytes, (unsigned char *) argv[2]);
  SHA256_Init (&ctx);
  SHA256_Update (&ctx, (unsigned char *) Addrbytes, 20);
  SHA256_Final (tmp2, &ctx);
  for (i = 0; i < SHA256_DIGEST_LENGTH; i++)
    B[i] = tmp[i] ^ tmp2[i];
  printf ("B=");
  print_hex (B, SHA256_DIGEST_LENGTH);
  #if DEBUG
  printf("Debug info:\n");
  printf ("r:0x%s\n", CycGrpZp_toHexString (&r));
  printf ("C:0x%s\n", CycGrpG_toHexString (&C));
  printf("H(C):");
  print_hex(tmp,SHA256_DIGEST_LENGTH);
  printf("H(addr):");
  print_hex(tmp2,SHA256_DIGEST_LENGTH);
  #endif
  return 0;
}
