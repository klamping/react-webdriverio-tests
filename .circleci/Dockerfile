FROM circleci/node:6.14.1-browsers

RUN sudo apt-get remove firefox-mozilla-build binutils && \
sudo sh -c "echo 'deb http://ftp.hr.debian.org/debian sid main' >> /etc/apt/sources.list" && \
sudo apt-get update && \
sudo apt-get install -t sid firefox && \
node -v