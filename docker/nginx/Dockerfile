FROM arm64v8/nginx:stable

MAINTAINER Jahn Estacado

RUN apt-get clean && apt-get update
RUN apt-get install -y --force-yes build-essential
RUN apt-get install -y --force-yes python
RUN mkdir /etc/nginx/sites-enabled

COPY docker/nginx/nginx.conf /etc/nginx/
COPY docker/nginx/estacadoslair.com /etc/nginx/sites-available/
COPY docker/nginx/main.sh .

RUN ln -s /etc/nginx/sites-available/estacadoslair.com /etc/nginx/sites-enabled/

COPY . .

RUN npm install && npm run build

RUN mkdir public/images/uploads

VOLUME ["/etc/letsencrypt", "/etc/ssl", "public/images/uploads"]

ENTRYPOINT ["bash", "main.sh"]

EXPOSE 5000
EXPOSE 5001
