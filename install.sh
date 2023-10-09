if [ ! -f SHA3IUF ]; then
git clone https://github.com/brainhub/SHA3IUF.git
cd SHA3IUF
make
cd ..
fi
if [ ! -f openssl ]; then
git clone https://github.com/openssl/openssl.git
fi
echo "By default we will use a precompiled libcrypto.a. If it doesn't work you should recompile the openssl library in ./openssl with emscripten and copy the so generated libcrypto.a file into openssl/precompiled. Contact me for assistance."
make
