#使用nginx镜像作为基础镜像
FROM nginx:1.26.0
#设置工作目录
WORKDIR /usr/app
#将dist文件夹中的文件复制到工作目录
COPY ./dist /usr/app
#将nginx配置文件复制到/etc/nginx/conf.d/目录
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#暴露80端口
EXPOSE 80
## 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
