// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdio.h>
#ifdef _CC
#define EMSCRIPTEN_KEEPALIVE
#else
#include <emscripten/emscripten.h>
#endif

#include "sha3.h"
static sha3_context ctx;
#define LENGTH_GRP_ELEMENTS 33	// 33 for secp256k1 = 32 + 1 byte for the sign. This is the length in binary. The length as hex string is then the double
#define LENGTH_ETH_ADDRESS 20
#define DIGEST_LENGTH 32

inline static void
HexToBytes (unsigned char *dst, unsigned char *src, size_t size)
{

  size_t count;
  for (count = 0; count < size; count++)
    {
      sscanf ((char *) src, "%2hhx", &dst[count]);
      src += 2;
    }
//print_hex(val,LENGTH_GRP_ELEMENTS);
}

EMSCRIPTEN_KEEPALIVE char *
iswithdrawable_keccac (char *argv1, char *argv2, char *argv3, char *argv4)
{
  int i, flag;
  unsigned char *tmp, *tmp2;
  const unsigned char *p;
  unsigned char Cbytes[LENGTH_GRP_ELEMENTS * 2];
  unsigned char Bbytes[DIGEST_LENGTH * 2];
  unsigned char Addrbytes[LENGTH_GRP_ELEMENTS * 2];
  CycGrpG A, C;
  CycGrpZp sk;
  group_init (714);
  CycGrpG_new (&A);
  CycGrpG_new (&C);
  CycGrpG_fromHexString (&A, argv1);
  if (!generate_secret_key_from_password (&sk, argv4))
    {
#ifdef _CC
      printf ("Unable to generate the secret key.\n");
      exit (1);
#else
      return "error";
#endif
    }
  tmp = malloc (DIGEST_LENGTH);
  tmp2 = malloc (DIGEST_LENGTH);
  CycGrpG_mul (&C, &A, &sk);
  sha3_Init256 (&ctx);
  sha3_SetFlags (&ctx, SHA3_FLAGS_KECCAK);
  HexToBytes (Cbytes, (unsigned char *) CycGrpG_toHexString (&C),
	      LENGTH_GRP_ELEMENTS);
  sha3_Update (&ctx, (unsigned char *) Cbytes, LENGTH_GRP_ELEMENTS);
  p = sha3_Finalize (&ctx);
  memcpy (tmp, p, DIGEST_LENGTH);
  HexToBytes (Addrbytes, (unsigned char *) argv3, LENGTH_ETH_ADDRESS);
  sha3_Init256 (&ctx);
  sha3_SetFlags (&ctx, SHA3_FLAGS_KECCAK);
  sha3_Update (&ctx, (unsigned char *) Addrbytes, LENGTH_ETH_ADDRESS);
  p = sha3_Finalize (&ctx);
  memcpy (tmp2, p, DIGEST_LENGTH);
  HexToBytes (Bbytes, (unsigned char *) argv2, DIGEST_LENGTH);
  flag = 1;
  for (i = 0; i < DIGEST_LENGTH; i++)
    {
      if (Bbytes[i] != (tmp[i] ^ tmp2[i]))
	{
	  flag = 0;
	  break;
	}
    }
#ifdef _CC
  printf ("%d\n", flag);
  return NULL;
#else
  if (flag)
    return "1";
  else
    return "0";
#endif
}

#ifdef _CC
int
main (int argc, char **argv)
{
  if (argc < 5)
    {
      printf
	("Usage of %s:\n%s A B addr pwd\nA: A and B values of the deposit from which to claim a withdrawal\naddr: address in favour of which the deposit is supposed to have been done\npwd: your secret password\n",
	 argv[0], argv[0]);
      exit (1);
    }
  iswithdrawable_keccac (argv[1], argv[2], argv[3], argv[4]);
  return 0;
}
#endif
