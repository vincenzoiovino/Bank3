CC=cc
EMCC=emcc
CCOPT=-Wall 
DFLAGS=-D_DEBUG_=0 -D_CC -O1
IOPT=-I ./include -I ./SHA3IUF/
IOPTWASM=-I ./include -I ./openssl/include -I ./SHA3IUF
LDFLAGS=-lcrypto SHA3IUF/libsha3.a
LDFLAGSWASM=-lcrypto -Lopenssl/precompiled -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['cwrap']"
bankdao: generate_shares encrypt encrypt_keccac compute_share_for_withdrawal witness_for_withdrawal
bankdao_wasm: generate_shares_wasm encrypt_keccac_wasm compute_share_for_withdrawal_wasm witness_for_withdrawal_wasm
bankwallets: generate_public_key witness_for_withdrawal_wallets
bankwallets_wasm: generate_public_key_wasm witness_for_withdrawal_wallets_wasm bankwallets_single_wasm
install: bankdao bankwallets
js-wasm: bankdao_wasm bankwallets_wasm
generate_shares.o: src/bankdao/generate_shares.c
	$(CC) -o src/bankdao/generate_shares.o -c src/bankdao/generate_shares.c $(IOPT) $(CCOPT) $(DFLAGS)
cyclic_group.o: src/commons/cyclic_group.c
	$(CC) -o src/commons/cyclic_group.o -c src/commons/cyclic_group.c $(IOPT) $(CCOPT) $(DFLAGS)
generate_shares: generate_shares.o cyclic_group.o
	$(CC) -o bin/bankdao/generate_shares  src/bankdao/generate_shares.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
generate_shares_wasm: 
	$(EMCC) -o js/bankdao/generate_shares.html  src/bankdao/generate_shares.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
encrypt: src/commons/encrypt.c cyclic_group.o
	$(CC) -o bin/commons/encrypt  src/commons/encrypt.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
encrypt_keccac: src/commons/encrypt_keccac.c cyclic_group.o
	$(CC) -o bin/commons/encrypt_keccac  src/commons/encrypt_keccac.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
encrypt_keccac_wasm: 
	$(EMCC) -o js/commons/encrypt_keccac.html  src/commons/encrypt_keccac.c SHA3IUF/sha3.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
compute_share_for_withdrawal: src/bankdao/compute_share_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/compute_share_for_withdrawal  src/bankdao/compute_share_for_withdrawal.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
compute_share_for_withdrawal_wasm: 
	$(EMCC) -o js/bankdao/compute_share_for_withdrawal.html  src/bankdao/compute_share_for_withdrawal.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
witness_for_withdrawal: src/bankdao/witness_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankdao/witness_for_withdrawal  src/bankdao/witness_for_withdrawal.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
witness_for_withdrawal_wallets: src/bankwallets/witness_for_withdrawal.c cyclic_group.o
	$(CC) -o bin/bankwallets/witness_for_withdrawal  src/bankwallets/witness_for_withdrawal.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
witness_for_withdrawal_wasm: 
	$(EMCC) -o js/bankdao/witness_for_withdrawal.html  src/bankdao/witness_for_withdrawal.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
generate_public_key.o: src/bankwallets/generate_public_key.c
	$(CC) -o src/bankwallets/generate_public_key.o -c src/bankwallets/generate_public_key.c $(IOPT) $(CCOPT) $(DFLAGS)
generate_public_key: generate_public_key.o cyclic_group.o
	$(CC) -o bin/bankwallets/generate_public_key  src/bankwallets/generate_public_key.c src/commons/cyclic_group.o $(IOPT) $(LDFLAGS) $(CCOPT) $(DFLAGS)
generate_public_key_wasm: 
	$(EMCC) -o js/bankwallets/generate_public_key.html  src/bankwallets/generate_public_key.c SHA3IUF/sha3.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
witness_for_withdrawal_wallets_wasm: 
	$(EMCC) -o js/bankwallets/witness_for_withdrawal.html  src/bankwallets/witness_for_withdrawal.c SHA3IUF/sha3.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
bankwallets_single_wasm: 
	$(EMCC) -o js/bankwallets/bankwallets_single.html  src/bankwallets/witness_for_withdrawal.c src/bankwallets/generate_public_key.c src/commons/encrypt_keccac.c  SHA3IUF/sha3.c src/commons/cyclic_group.c $(IOPTWASM) $(LDFLAGSWASM)
clean:
	rm -f bin/bankdao/* src/*.o src/bankdao/*.o src/bankwallets/*.o src/commons/.o
