#!/bin/bash
echo "current directory:$(pwd)"
current_dir=$(pwd)

node "${current_dir}"/ci_script/genPackage.js
cd ./components || exit
npm publish  --registry=http://nexus.yfb.sunline.cn:8099/nexus3/repository/npm-private/
