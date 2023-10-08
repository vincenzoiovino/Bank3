if [ ! -f SHA3IUF ]; then
git clone https://github.com/brainhub/SHA3IUF.git
make
cd ..
fi
if [ ! -f openssl ]; then
git clone https://github.com/openssl/openssl.git
make
cd ..
fi
make
