#!/bin/bash
# 容器内运行的脚本

function title {
  echo 
  echo "###############################################################################"
  echo "## $1"
  echo "###############################################################################" 
  echo 
}

user=ubuntu
project_name=discord-clone
container_name=gsemir/discord-clone
deploy_dir=/home/$user/deploys/node/$project_name/$time

cd $deploy_dir
title '远程1 停止并删除旧容器'
docker stop $(docker ps -a -q --filter ancestor=$container_name)
docker rm $(docker ps -a -q --filter ancestor=$container_name)
title '远程2 构建镜像'
docker build -t $container_name .
title '远程3 启动容器'
docker run -p 3000:3000 -d $container_name