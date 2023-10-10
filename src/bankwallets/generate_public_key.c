// The Bank DAO system was initially described here:
// https://hackmd.io/q4RHSYE6Tb6fRqgPIML9QA?view
// 
// Vincenzo Iovino, 2023, Aragon ZK Research
#include "cyclic_group.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int
main (int argc, char **argv)
{
char *password;
  if (argc < 2)
    {
      printf
	("Usage of %s:\n%s password\npassword: secret password used to compute the public key. DO NOT SHARE IT with anyone\n",
	 argv[0], argv[0]);
      exit (1);
    }
  password = argv[1];
  {

    CycGrpZp sk;
    CycGrpG PK;
    group_init (714);		// secp256k1
    CycGrpG_new (&PK);
	
    if (!generate_secret_key_from_password (&sk,password)){
    return 1;
	}
    generate_public_key (&PK, &sk);
    printf ("sk:%s\n", CycGrpZp_toHexString (&sk));
    printf ("PK:0x%s\n", CycGrpG_toHexString (&PK));
  }
}
