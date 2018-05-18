FROM circleci/node:8-browsers

RUN sudo apt-get remove firefox-mozilla-build && \
sudo sh -c "echo 'deb http://ftp.hr.debian.org/debian sid main' >> /etc/apt/sources.list" && \
sudo apt-get update && \
sudo apt-get remove binutils && \
sudo apt-get install -t sid firefox && \
firefox --version
