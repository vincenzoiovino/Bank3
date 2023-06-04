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
	("Usage of %s:\n%s A s\nA: A value of the deposit from which to claim a withdrawal\ns: your secret shar\n",
	 argv[0], argv[0]);
      exit (1);
    }

  CycGrpG A, S;
  CycGrpZp s;
  group_init (714);
  CycGrpZp_new (&s);
  CycGrpG_new (&A);
  CycGrpG_new (&S);
  CycGrpG_fromHexString (&A, argv[1]);
  CycGrpZp_fromHexString (&s, argv[2]);
  CycGrpG_mul (&S, &A, &s);
  printf
    ("Share to broadcast to other users (along with your user index): %s\n",
     CycGrpG_toHexString (&S));
  return 0;
}
