// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
// this is identical to encrypt.c except that this uses keccac256. The values computed by this procedure indeed must be used with the on-chain method MakeWithdrawalKeccac256
#include "cyclic_group.h"
#include <stdio.h>

#include "sha3.h"
static sha3_context ctx;
#define LENGTH_GRP_ELEMENTS 33	// 33 for secp256k1 = 32 + 1 byte for the sign. This is the length in binary. The length as hex string is then the double
#define DIGEST_LENGTH 32

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
  unsigned char B[DIGEST_LENGTH];
  unsigned char *tmp, *tmp2;
  const unsigned char *p;
  unsigned char Cbytes[LENGTH_GRP_ELEMENTS * 2];
  unsigned char Addrbytes[LENGTH_GRP_ELEMENTS * 2];
  if (argc < 3)
    {
      printf
	("Usage of %s:\n%s PK addr\nPK: public key of the DAO to which make the deposit \naddr: address of the DAO\n",
	 argv[0], argv[0]);
      exit (1);
    }
  p = malloc (DIGEST_LENGTH);
  tmp = malloc (DIGEST_LENGTH);
  tmp2 = malloc (DIGEST_LENGTH);
  CycGrpZp r;
  CycGrpG PK, A, C;
  group_init (714);		// NID for secp256k1
  CycGrpZp_new (&r);
  CycGrpG_new (&PK);
  CycGrpG_new (&A);
  CycGrpG_new (&C);
  CycGrpG_fromHexString (&PK, argv[1]);
  CycGrpZp_setRand (&r);
  CycGrpG_mul (&A, CycGrpGenerator, &r);
  CycGrpG_mul (&C, &PK, &r);
  printf ("A:0x%s\n", CycGrpG_toHexString (&A));
  sha3_Init256 (&ctx);
  sha3_SetFlags (&ctx, SHA3_FLAGS_KECCAK);
  HexToBytes (Cbytes, (unsigned char *) CycGrpG_toHexString (&C));
  sha3_Update (&ctx, (unsigned char *) Cbytes, LENGTH_GRP_ELEMENTS);
  p = sha3_Finalize (&ctx);
  memcpy (tmp, p, DIGEST_LENGTH);
  HexToBytes (Addrbytes, (unsigned char *) argv[2]);
  sha3_Init256 (&ctx);
  sha3_SetFlags (&ctx, SHA3_FLAGS_KECCAK);
  sha3_Update (&ctx, (unsigned char *) Addrbytes, 20);
  p = sha3_Finalize (&ctx);
  memcpy (tmp2, p, DIGEST_LENGTH);
  for (i = 0; i < DIGEST_LENGTH; i++)
    B[i] = tmp[i] ^ tmp2[i];
  printf ("B=");
  print_hex (B, DIGEST_LENGTH);
#if DEBUG
  printf ("Debug info:\n");
  printf ("r:0x%s\n", CycGrpZp_toHexString (&r));
  printf ("C:0x%s\n", CycGrpG_toHexString (&C));
  printf ("H(C):");
  print_hex (tmp, DIGEST_LENGTH);
  printf ("H(addr):");
  print_hex (tmp2, DIGEST_LENGTH);
#endif
  return 0;
}
