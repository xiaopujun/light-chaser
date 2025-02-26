FROM node:20.12.0 as builder
#设置工作目录
WORKDIR /usr/app/light-chaser
RUN npm  install
RUN npm run build

#将dist文件夹中的文件复制到工作目录
COPY ./dist .
#将nginx配置文件复制到/etc/nginx/conf.d/目录
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#暴露80端口
EXPOSE 80
## 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
