#!/bin/bash
echo "current directory:$(pwd)"
current_dir=$(pwd)

npm i
node ${current_dir}/ci_script/genPackage.js
cd ${current_dir}/generators
npm publish
