// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdio.h>
int
main (int argc, char **argv)
{
  if (argc < 3)
    {
      printf
	("Usage of %s:\n%s A pwd\nA: A value of the deposit from which to claim a withdrawal\ns: your secret password\n",
	 argv[0], argv[0]);
      exit (1);
    }

  CycGrpG A, C;
  CycGrpZp sk;
  group_init (714);
  CycGrpG_new (&A);
  CycGrpG_new (&C);
  CycGrpG_fromHexString (&A, argv[1]);
    if (!generate_secret_key_from_password (&sk,argv[2])){
    printf("Unable to generate the secret key.\n");
    return 1;
    }
  CycGrpG_mul (&C, &A, &sk);
  printf
    ("Witness C: 0x%s\n",
     CycGrpG_toHexString (&C));
  return 0;
}
