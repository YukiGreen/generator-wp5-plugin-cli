#!/bin/bash
echo "current directory:$(pwd)"

# 生成模块信息
node ./ci_script/genModuleInfo.js
