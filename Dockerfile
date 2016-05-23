FROM node:0.12-slim
MAINTAINER Jahn Estacado

RUN npm install -g forever --no-progress

ENV INSTALL_PATH /www/estacadoslair
ENV MONGO_URI mongodb:27017
ENV SSL_DIR /.ssl
ENV STORAGE_DIR /storage

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . .


CMD ["forever", "src/server.js"]

EXPOSE 5050
