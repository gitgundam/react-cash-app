#!/usr/bin/env sh
set -e

rm -rf dist

npm run build

cd dist

git init 

git add -A

git commit -m 'deploy'

git remote add origin git@github.com:gitgundam/react-cash-app-preview.git

git branch -M master

git push -f origin master

cd -