#!/bin/bash

arg=$1
script_dir=$(cd `dirname $0`;
pwd)
project_dir=$(cd `dirname "$script_dir"`;
pwd)

sed_cmd_prefix='sed -i'

case "$OSTYPE" in
  solaris*) echo "Current OS: SOLARIS" ;;
  darwin*) echo "Current OS: OSX" && sed_cmd_prefix='sed -i ""' ;;
  linux*) echo "Current OS: LINUX" ;;
  bsd*) echo "Current OS: BSD" ;;
  msys*) echo "Current OS: WINDOWS" ;;
  cygwin*) echo "Current OS: WINDOWS" ;;
  *) echo "Current OS(unknown): $OSTYPE" ;;
esac

echo "replace repository url..."

if [[ "${arg}" == "o" ]]; then
  ${sed_cmd_prefix} 's/proxy.yfb.sunline.cn/e-proxy.yfb.sunline.cn/g' ${project_dir}/.npmrc
  ${sed_cmd_prefix} 's/nexus.yfb.sunline.cn:8099/e-proxy.yfb.sunline.cn/g' ${project_dir}/.npmrc
  ${sed_cmd_prefix} 's/nexus.yfb.sunline.cn:8099/e-proxy.yfb.sunline.cn/g' ${project_dir}/.yarnrc
  ${sed_cmd_prefix} 's/nexus.yfb.sunline.cn:8099/e-proxy.yfb.sunline.cn/g' ${project_dir}/yarn.lock
elif [[ "${arg}" == "i" ]]; then
  ${sed_cmd_prefix} 's/e-proxy.yfb.sunline.cn/nexus.yfb.sunline.cn:8099/g' ${project_dir}/.npmrc
  ${sed_cmd_prefix} 's/e-proxy.yfb.sunline.cn/nexus.yfb.sunline.cn:8099/g' ${project_dir}/.yarnrc
  ${sed_cmd_prefix} 's/e-proxy.yfb.sunline.cn/nexus.yfb.sunline.cn:8099/g' ${project_dir}/yarn.lock
fi

echo "replace repository url done."
