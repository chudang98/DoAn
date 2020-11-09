#!/bin/bash
eval $(ssh-agent -s)
ssh-add /home/ubuntu/.ssh/id_rsa
cd /home/ubuntu/SoTaySinhVien
git fetch
git checkout master
git pull 
npm i
npm run build
npm run deploy-local