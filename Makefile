CC=cc
EMCC=emcc
CCOPT=-Wall 
DFLAGS=-D_DEBUG_=1 
IOPT=-I ./include
IOPT2=-I ./include -I ./SHA3IUF/
IOPTWASM=-I ./include -I ./openssl/include -I ./SHA3IUF
LDFLAGS=-lcrypto
LDFLAGS2=-lcrypto SHA3IUF/libsha3.a
LDFLAGSWASM=-lcrypto -Lopenssl/precompiled
bankdao: generate_shares encrypt encrypt_keccac compute_share_for_withdrawal witness_for_withdrawal
bankdao_wasm: generate_shares_wasm encrypt_keccac_wasm compute_share_for_withdrawal_wasm witness_for_withdrawal_wasm
install: bankdao
wasm: bankdao_wasm
generate_shares.o: src/bankdao/generate_shares.c
	$(CC) -o src/bankdao/generate_shares.o -c src/bankdao/generate_shares.c $(IOPT) $(CCOPT)
cyclic_group.o: src/bankdao/cyclic_group.c
	$(CC) -o src/bankdao/cyclic_group.o -c src/bankdao/cyclic_group.c $(IOPT) $(CCOPT)
generate_shares: generate_shares.o cyclic_group.o
	$(CC) -o bin/bankdao/generate_shares  src/bankdao/generate_shares.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
generate_shares_wasm: 
	$(EMCC) -o js/bankdao/generate_shares.html  src/bankdao/generate_shares.c src/bankdao/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
encrypt: src/bankdao/encrypt.c cyclic_group.o
	$(CC) -o bin/bankdao/encrypt  src/bankdao/encrypt.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
encrypt_keccac: src/bankdao/encrypt_keccac.c cyclic_group.o
	$(CC) -o bin/bankdao/encrypt_keccac  src/bankdao/encrypt_keccac.c src/bankdao/cyclic_group.o $(IOPT2) $(LDFLAGS2) $(CCOPT)
encrypt_keccac_wasm: 
	$(EMCC) -o js/bankdao/encrypt_keccac.html  src/bankdao/encrypt_keccac.c SHA3IUF/sha3.c src/bankdao/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
compute_share_for_withdrawal: src/bankdao/compute_share_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/compute_share_for_withdrawal  src/bankdao/compute_share_for_withdrawal.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
compute_share_for_withdrawal_wasm: 
	$(EMCC) -o js/bankdao/compute_share_for_withdrawal.html  src/bankdao/compute_share_for_withdrawal.c src/bankdao/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
witness_for_withdrawal: src/bankdao/witness_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/witness_for_withdrawal  src/bankdao/witness_for_withdrawal.c src/bankdao/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT)
witness_for_withdrawal_wasm: 
	$(EMCC) -o js/bankdao/witness_for_withdrawal.html  src/bankdao/witness_for_withdrawal.c src/bankdao/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
clean:
	rm -f bin/bankdao/* 
