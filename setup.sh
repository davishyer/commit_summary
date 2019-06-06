#!/usr/bin/env bash

if ! [[ -x $(command -v node) ]]; then
  echo -e "\033[31mERROR: node is not installed!\033[0m"
  echo "Get it here: http://nodejs.org/"
  exit 1
fi

npm install

mkdir config
touch config/authors.txt
touch config/projectRoot.txt
touch config/repositories.txt