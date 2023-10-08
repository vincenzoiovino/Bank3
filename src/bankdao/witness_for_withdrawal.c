// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdio.h>

void
ComputeLagrangeCoefficient (CycGrpZp * lambda, int t, int i, int Q[])
{				// Compute Lagrange coefficient lambda of user i with respect to a set of indices Q that is a subset of [t]
  int j, flag = 0;
  char str[32];
  CycGrpZp Tmp1, Tmp2, I;
  CycGrpZp_new (&Tmp1);
  CycGrpZp_new (&Tmp2);
  CycGrpZp_new (&I);
  snprintf (str, 8, "%x", Q[i]);
  CycGrpZp_deserialize (&I, (unsigned char *) str, 8);	// I=Q[i]

  for (j = 0; j < t; j++)
    {
      if (j == i)
	continue;
      snprintf (str, 8, "%x", Q[j]);
      CycGrpZp_deserialize (&Tmp1, (unsigned char *) str, 8);	// Tmp1=Q[j]
//   printf ("i:%d Q[0]:%d Q[1]:%d j:%d Tmp1: %s\n", i,Q[0],Q[1],j,    CycGrpZp_toHexString (&Tmp1));
      CycGrpZp_copy (&Tmp2, &Tmp1);
      CycGrpZp_sub (&Tmp1, &Tmp1, &I);	// Tmp1=Q[j]-Q[i]
      CycGrpZp_inverse (&Tmp1, &Tmp1);	// Tmp1 =1/Tmp1
      CycGrpZp_mul (&Tmp1, &Tmp1, &Tmp2);	// Tmp1= Q[j]*Tmp1= Q[j]/(Q[j]-Q[i])
      if (flag)
	{
	  CycGrpZp_mul (lambda, lambda, &Tmp1);
	}
      else
	{
	  flag = 1;
	  CycGrpZp_copy (lambda, &Tmp1);
	}
    }

}

int
main (int argc, char **argv)
{
  int i, t, flag = 0;
  CycGrpG Tmp, C;
  if (argc < 2 || argc < 2 + 2 * (t = atoi (argv[1])))
    {
      printf
	("Usage of %s:\n%s t i_1 S_i ... i_t S_t\nt: threshold number of users needed to compute the witness\ni_1 S_1 ... i_t S_t is a list of t pairs in which i_j represents the index of the user and S_j the corresponding value S_j of user j computed by the program compute_share_for_withdrawal.\n",
	 argv[0], argv[0]);
      exit (1);
    }
  {
    CycGrpG S[t];
    int Q[t];			// the set of indices of the users who participate in the reconstruction
    CycGrpZp LagrangeCoefficients[t];	// the Lagrange coefficients for the set Q
    group_init (714);
    CycGrpG_new (&Tmp);
    CycGrpG_new (&C);
    for (i = 0; i < t; i++)
      Q[i] = atoi (argv[2 + 2 * i]);
    for (i = 0; i < t; i++)
      {

	CycGrpG_new (&S[i]);
	CycGrpG_fromHexString (&S[i], argv[3 + 2 * i]);
	CycGrpZp_new (&LagrangeCoefficients[i]);
	ComputeLagrangeCoefficient (&LagrangeCoefficients[i], t, i, Q);

	CycGrpG_mul (&Tmp, &S[i], &LagrangeCoefficients[i]);
	if (flag)
	  {
	    CycGrpG_add (&C, &C, &Tmp);
	  }
	else
	  {
	    flag = 1;
	    CycGrpG_copy (&C, &Tmp);
	  }

      }


  }

  printf ("Witness C: 0x%s\n", CycGrpG_toHexString (&C));
  return 0;
}
