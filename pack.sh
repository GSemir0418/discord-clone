#!/bin/bash
function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

user=ubuntu
ip=gsemir2.tpddns.cn

project_name=discord-clone
time=$(date +'%Y%m%d-%H%M%S')
current_dir=$(dirname $0)
deploy_dir=/home/$user/deploys/node/$project_name/$time

title '1 项目压缩'
tar -czf $project_name.tar.gz --exclude='node_modules' --exclude='.next' -C $current_dir .
title '2 创建远程目录'
ssh $user@$ip "mkdir -p $deploy_dir"
title '3 上传包至远程目录'
scp $project_name.tar.gz $user@$ip:$deploy_dir
title '4 解压缩'
ssh $user@$ip "tar -xzf $deploy_dir/$project_name.tar.gz -C $deploy_dir"
title '5 清理缓存'
rm $project_name.tar.gz
ssh $user@$ip "rm $deploy_dir/$project_name.tar.gz"
title '6 执行远程部署脚本'
ssh $user@$ip "export time=$time; /usr/bin/zsh $deploy_dir/setup.sh"
