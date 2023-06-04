CC=gcc
CCOPT=-Wall 
DFLAGS0=-D_DEBUG_=1 
DFLAGS1=-D_DEBUG_=1  
IOPT=-I ./include
LDFLAGS=-lcrypto  
all:  generate_shares encrypt compute_share_for_withdrawal
install:  all
generate_shares.o: src/generate_shares.c
	$(CC) -o src/generate_shares.o -c src/generate_shares.c -I ./include $(CCOPT)
cyclic_group.o: src/cyclic_group.c
	$(CC) -o src/cyclic_group.o -c src/cyclic_group.c -I ./include $(CCOPT)
generate_shares: src/generate_shares.c src/cyclic_group.o
	$(CC) -o bin/generate_shares  src/generate_shares.c src/cyclic_group.o -I ./include $(LDFLAGS) $(CCOPT)
encrypt: src/encrypt.c src/cyclic_group.o
	$(CC) -o bin/encrypt  src/encrypt.c src/cyclic_group.o -I ./include $(LDFLAGS) $(CCOPT)
compute_share_for_withdrawal: src/compute_share_for_withdrawal.c src/cyclic_group.o
	$(CC) -o bin/compute_share_for_withdrawal  src/compute_share_for_withdrawal.c src/cyclic_group.o -I ./include $(LDFLAGS) $(CCOPT)
clean:
	rm -f bin/* src/*.o 
