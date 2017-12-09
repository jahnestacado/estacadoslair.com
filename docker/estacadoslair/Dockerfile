FROM arm64v8/node:slim

MAINTAINER Jahn Estacado

RUN apt-get clean && apt-get update
RUN apt-get install -y --force-yes build-essential
RUN apt-get install -y --force-yes python
RUN npm install -g pm2



COPY . .

RUN npm install && npm run build

ENTRYPOINT ["pm2-docker", "start", "src/server.js"]

EXPOSE 7070
