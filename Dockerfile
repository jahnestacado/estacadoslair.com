FROM arm64v8/node:slim

MAINTAINER Jahn Estacado

RUN npm install -g pm2

COPY . .

RUN npm install --no-progress && rm -f .git

ENTRYPOINT ["pm2-docker", "start", "src/server.js"]

EXPOSE 7070
