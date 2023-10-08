CC=cc
CCOPT=-Wall 
DFLAGS=-D_DEBUG_=1 
IOPT=-I ./include
IOPT2=-I ./include -I ./SHA3IUF/
LDFLAGS=-lcrypto
LDFLAGS2=-lcrypto SHA3IUF/libsha3.a
bankdao: generate_shares encrypt encrypt2 compute_share_for_withdrawal witness_for_withdrawal
install: bankdao
generate_shares.o: src/bankdao/generate_shares.c
	$(CC) -o src/bankdao/generate_shares.o -c src/bankdao/generate_shares.c $(IOPT) $(CCOPT)
cyclic_group.o: src/bankdao/cyclic_group.c
	$(CC) -o src/bankdao/cyclic_group.o -c src/bankdao/cyclic_group.c $(IOPT) $(CCOPT)
generate_shares: generate_shares.o cyclic_group.o
	$(CC) -o bin/bankdao/generate_shares  src/bankdao/generate_shares.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
encrypt: src/bankdao/encrypt.c cyclic_group.o
	$(CC) -o bin/bankdao/encrypt  src/bankdao/encrypt.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
encrypt2: src/bankdao/encrypt2.c cyclic_group.o
	$(CC) -o bin/bankdao/encrypt2  src/bankdao/encrypt2.c src/bankdao/cyclic_group.o $(IOPT2) $(LDFLAGS2) $(CCOPT)
compute_share_for_withdrawal: src/bankdao/compute_share_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/compute_share_for_withdrawal  src/bankdao/compute_share_for_withdrawal.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
witness_for_withdrawal: src/bankdao/witness_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/witness_for_withdrawal  src/bankdao/witness_for_withdrawal.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
clean:
	rm -f bin/bankdao/* src/bankdao/*.o 
