// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static inline void
ComputeShares (unsigned t, unsigned m, CycGrpZp shares[], CycGrpZp * s)
{				// s is the secret
// p(x)=Sum_{i=1}^{t-1} A_ix^i+s
// we evaluate it at points 1,..,m
  char iStr[8];
  CycGrpZp A[t - 1];
  CycGrpZp tmp, tmp2, xtoi;
  CycGrpZp_new (&tmp);
  CycGrpZp_new (&tmp2);
  CycGrpZp_new (&xtoi);
  int i, j;
  for (i = 1; i <= t - 1; i++)
    {
      CycGrpZp_new (&A[i - 1]);
      CycGrpZp_setRand (&A[i - 1]);
    }
  for (i = 1; i <= m; i++)
    {
      // CycGrpZp_new (&shares[i - 1]);
      snprintf (iStr, 8, "%x", i);
      CycGrpZp_deserialize (&tmp2, (unsigned char *) iStr, 8);
      CycGrpZp_copy (&xtoi, &tmp2);
      for (j = 1; j <= t - 1; j++)
	{
	  CycGrpZp_mul (&tmp, &A[j - 1], &xtoi);
	  CycGrpZp_mul (&xtoi, &xtoi, &tmp2);

	}
      if (t == 1)
	CycGrpZp_copy (&shares[i - 1], s);
      else
	CycGrpZp_add (&shares[i - 1], &tmp, s);
    }

}

int
main (int argc, char **argv)
{
  int i;
  unsigned t, m;
  if (argc < 3)
    {
      printf
	("Usage of %s:\n%s t m\nt: threshold for the SS\nm: number of users\n",
	 argv[0], argv[0]);
      exit (1);
    }
  t = atoi (argv[1]);
  m = atoi (argv[2]);
  {

    CycGrpZp sk[m], s;
    CycGrpG PK;
    group_init (714);		// secp256k1
    for (i = 0; i < m; i++)
      CycGrpZp_new (&sk[i]);
    CycGrpZp_new (&s);
    CycGrpG_new (&PK);

    generate_secret_key (&s);
    generate_public_key (&PK, &s);
    printf ("s:%s\n", CycGrpZp_toHexString (&s));
    printf ("PK:%s\n", CycGrpG_toHexString (&PK));
    ComputeShares (t, m, sk, &s);

    for (i = 0; i < m; i++)
      printf ("Share %d:%s\n", i + 1, CycGrpZp_toHexString (&sk[i]));
  }
}
