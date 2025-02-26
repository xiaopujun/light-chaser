# 构建阶段
FROM node:20.12.0 as builder

#设置工作目录
WORKDIR /usr/app/light-chaser

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./
RUN npm  install

# 复制项目文件
COPY . .

RUN npm run build

# 运行阶段
FROM nginx:alpine

# 设置工作目录
WORKDIR /usr/app/light-chaser


# 将构建阶段的 dist 目录复制到工作目录
COPY --from=builder /usr/app/light-chaser/dist .

#将nginx配置文件复制到/etc/nginx/conf.d/目录
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#暴露80端口
EXPOSE 80

## 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
