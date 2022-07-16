#!/bin/bash
echo "current directory:`pwd`"
sourcecodedir=$(pwd)


# yarn
echo "Update dependency:"
yarn

#region 推送sonar数据
#if [[ "${CI_BUILD_REF_NAME}" == *master* ]]; then
#  cd ${sourcecodedir} || exit 1
#  export PATH=${JAVA_HOME}/bin:${PATH}
#  yarn add sonar-scanner --save-dev
#  node ./ci_script/genSonar.js
#  ./node_modules/.bin/sonar-scanner
#fi