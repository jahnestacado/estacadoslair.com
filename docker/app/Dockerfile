FROM ubuntu:18.04

MAINTAINER Jahn Estacado

COPY . .

RUN apt-get clean && apt-get update && apt-get install -y \
     build-essential \
     python \
     nodejs \
     npm \
&& mkdir public/images/uploads \
&& npm install \
&& node_modules/.bin/grunt string-replace

RUN  npm cache clean && npm prune \
&& apt-get remove --purge -y  build-essential \
&& apt-get -y autoremove \
&& apt-get -y autoclean

VOLUME ["public/images/uploads", "docker-host"]

ENTRYPOINT ["npm", "start"]

EXPOSE 7070
