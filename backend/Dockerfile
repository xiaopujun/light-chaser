FROM openjdk:17-jdk-slim
WORKDIR /usr/app/light-chaser-server
EXPOSE 8080
COPY ./target/lc-server.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
