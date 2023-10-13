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

EMSCRIPTEN_KEEPALIVE char *
witness_for_withdrawal (char *argv1, char *argv2)
{

#ifndef _CC
  char *ret = calloc (256, 1);
#endif
  CycGrpG A, C;
  CycGrpZp sk;
  group_init (714);
  CycGrpG_new (&A);
  CycGrpG_new (&C);
  CycGrpG_fromHexString (&A, argv1);
  if (!generate_secret_key_from_password (&sk, argv2))
    {
#ifdef _CC
      printf ("Unable to generate the secret key.\n");
      exit (1);
#else
      return "error";
#endif
    }
  CycGrpG_mul (&C, &A, &sk);
#ifdef _CC
  printf ("Witness C: 0x%s\n", CycGrpG_toHexString (&C));
  return NULL;
#else
  sprintf (ret, "0x%s\n", CycGrpG_toHexString (&C));
  return ret;
#endif
}

#ifdef _CC
int
main (int argc, char **argv)
{
  if (argc < 3)
    {
      printf
	("Usage of %s:\n%s A pwd\nA: A value of the deposit from which to claim a withdrawal\npwd: your secret password\n",
	 argv[0], argv[0]);
      exit (1);
    }
  witness_for_withdrawal(argv[1],argv[2]);
  return 0;
}
#endif
