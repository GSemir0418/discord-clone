#!/bin/bash
# 服务器运行的脚本

function title {
  echo 
  echo "*******************************************"
  echo "** $1"
  echo "*******************************************" 
  echo 
}

user=discord_clone
project_name=discord-clone
container_name=discord-clone
deploy_dir=/home/$user/deploys/$project_name/$time

cd $deploy_dir
# title '远程1 停止并删除旧容器'
# docker stop $(docker ps -a -q --filter ancestor=$container_name)
# docker rm $(docker ps -a -q --filter ancestor=$container_name)
# title '远程2 构建镜像'
# docker build -t $container_name .
# title '远程3 启动容器'
# docker run -p 3000:3000 -d $container_name
title '远程0 终止并移除旧任务'
pm2 delete discord-clone-app
title '远程1 安装依赖'
npm install
title '远程2 build'
npm run build
title '远程3 启动app'
pm2 start npm --name "discord-clone-app" -- run start
