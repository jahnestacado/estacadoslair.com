FROM arm64v8/node:slim

MAINTAINER Jahn Estacado

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python && npm install -g pm2

COPY . .

RUN npm install && npm run build

ENTRYPOINT ["pm2-docker", "start", "src/server.js"]

EXPOSE 7070
