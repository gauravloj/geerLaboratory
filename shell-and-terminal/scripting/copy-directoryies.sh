#!/bin/bash -e


remote_host='temp.local'
remote_user='lakno'
remote_path='~/bakup/'
pathlist='.bashrc .config .gitconfig .ssh .viminfo .zshrc Desktop Downloads workshop'


# Use private key to avoide password
private_key='~/.ssh/id_rsa'
for path in $pathlist
do
    rsync -avz --progress -e "ssh -i $private_key" --exclude '.git' --exclude 'node_modules' $HOME/$path $remote_user@$remote_host:$remote_path
    
done

