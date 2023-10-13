// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#ifdef _CC
#define EMSCRIPTEN_KEEPALIVE
#else
#include <emscripten/emscripten.h>
#endif


EMSCRIPTEN_KEEPALIVE char *
gen_public_key (char *password)
{

#ifndef _CC
  char *ret = calloc (256, 1);
#endif
  CycGrpZp sk;
  CycGrpG PK;
  group_init (714);		// secp256k1
  CycGrpG_new (&PK);

  if (!generate_secret_key_from_password (&sk, password))
    {
#ifdef _CC
      printf ("Unable to generate the secret key.\n");
      exit (1);
#else
      return "error";
#endif
    }
  generate_public_key (&PK, &sk);
#ifdef _CC
  printf ("sk:%s\n", CycGrpZp_toHexString (&sk));
  printf ("PK:0x%s\n", CycGrpG_toHexString (&PK));
  return NULL;
#else
  sprintf (ret, "%s\n", CycGrpZp_toHexString (&sk));
  sprintf (ret, "0x%s\n", CycGrpG_toHexString (&PK));
  return ret;
#endif

}

#ifdef _CC
int
main (int argc, char **argv)
{
  if (argc < 2)
    {
      printf
	("Usage of %s:\n%s password\npassword: secret password used to compute the public key. DO NOT SHARE IT with anyone\n",
	 argv[0], argv[0]);
      exit (1);
    }

  gen_public_key (argv[1]);
  return 0;
}
#endif
