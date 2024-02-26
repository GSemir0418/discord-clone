FROM node:20.10.0
ENV NODE_ENV=production
# 创建工作路径
WORKDIR /usr/src/app
# 配置容器的 npm 源
RUN npm set registry http://registry.npmmirror.com
# 将本地的package.json复制到容器工作目录
# COPY package.json ./
# COPY package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
# 将本地根目录下的全部文件都拷贝至容器工作目录
RUN npx prisma generate
RUN npx prisma db push
EXPOSE 3000
# 在容器运行启动命令
CMD [ "npm", "start"]