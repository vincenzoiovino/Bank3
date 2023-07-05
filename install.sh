if [ ! -f SHA3IUF ]; then
git clone https://github.com/brainhub/SHA3IUF.git
make
cd ..
fi
make
