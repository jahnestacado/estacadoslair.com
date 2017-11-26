FROM arm64v8/node:slim

MAINTAINER Jahn Estacado

RUN npm install -g pm2

COPY ../../* .

RUN rm -rf .git

ENTRYPOINT ["pm2-docker", "start", "src/server.js"]

EXPOSE 7070
