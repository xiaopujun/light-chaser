#############如果你想Docker执行全流程的构建，则运行下面的多阶段构建任务######################
# 第一阶段：编译构建
#使用node镜像作为基础镜像(lts:node长期支持版本)
FROM node:lts as build
#设置工作目录
WORKDIR /usr/app
#复制构建编译所必须的文件到工作目录
COPY . .
#安装pnpm
RUN npm install -g pnpm@8.14.3
#安装依赖并构建
RUN pnpm install && pnpm run build

# 第二阶段：运行
#使用nginx镜像作为基础镜像
FROM nginx:alpine as runner
#设置工作目录
WORKDIR /usr/app/light-chaser
#覆盖默认配置文件
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# 将构建阶段的 dist 目录复制到 Nginx 的 web 根目录
COPY --from=build /usr/app/dist /usr/app/light-chaser
# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]


#############如果你想自己编译后上传文件到Docker镜像，请使用下面的构建脚本######################

##使用nginx镜像作为基础镜像
#FROM node:lts
##设置工作目录
#WORKDIR /usr/app/light-chaser
##将dist文件夹中的文件复制到工作目录
#COPY ./dist /usr/app/light-chaser
##将nginx配置文件复制到/etc/nginx/conf.d/目录
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
##暴露80端口
#EXPOSE 80
### 启动Nginx服务
#CMD ["nginx", "-g", "daemon off;"]
