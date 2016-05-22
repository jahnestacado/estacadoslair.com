FROM node:0.12-slim
MAINTAINER Jahn Estacado

RUN npm install -g forever --no-progress

ENV MONGO_URI mongodb:27017
ENV INSTALL_PATH /www/estacadoslair

RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH
COPY . .

ENV SSL_DIR /.ssl

CMD ["forever", "start", "src/server.js"]

EXPOSE 5050
