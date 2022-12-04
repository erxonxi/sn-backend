#!/bin/bash

git reset --hard master

git pull

yarn

make restart_mooc_backend
