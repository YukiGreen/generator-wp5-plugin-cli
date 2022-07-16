#!/bin/bash
echo "current directory:$(pwd)"
current_dir=$(pwd)

source ./ci_script/env.sh

rm -Rf ./api-docs

node "${current_dir}"/ci_script/genTypedoc.js
yarn api-docs

tar -cf "${current_dir}"/${CI_PROJECT_NAME}-${CI_BUILD_REF_NAME}-api-docs.tar -C "${current_dir}"/api_docs .

# 新建远程目录
cd ${current_dir} || exit 1
if [ ! -f "${current_dir}"/${CI_PROJECT_NAME}-${CI_BUILD_REF_NAME}-api-docs.tar ]; then
	echo -e '产生的包不存在, 这可能是已知bug导致的, 请保证本项目在没有其它流水线同时运行的情况下重新运行整个流水线.'
	exit 1
fi
ssh gitlab-runner@${TEST_SER_IP} "mkdir -pv ${TEST_WWW_ROOT}"
ssh gitlab-runner@${TEST_SER_IP} "/usr/bin/rm -rf ${TEST_WWW_ROOT}/*"

# 解压
echo -e '睡眠前...'
ls -lah ./
sleep 5
echo -e '睡眠后...'
ls -lah ./
cat ./${CI_PROJECT_NAME}-${CI_BUILD_REF_NAME}-api-docs.tar | ssh gitlab-runner@${TEST_SER_IP} "cd ${TEST_WWW_ROOT}; tar -xf - "
