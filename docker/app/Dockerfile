FROM node:slim

MAINTAINER Jahn Estacado

RUN apt-get clean && apt-get update
RUN apt-get install -y --force-yes build-essential
RUN apt-get install -y --force-yes python


COPY . .

RUN mkdir public/images/uploads

VOLUME ["public/images/uploads", "docker-host"]

RUN npm install
RUN node_modules/.bin/grunt string-replace
RUN npm prune

ENTRYPOINT ["npm", "start"]

EXPOSE 7070
