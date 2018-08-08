FROM arm64v8/nginx:stable

MAINTAINER Jahn Estacado
RUN mkdir /etc/nginx/sites-enabled

COPY docker/nginx/nginx.conf /etc/nginx/
COPY docker/nginx/head-detached.com /etc/nginx/sites-available/
COPY docker/nginx/main.sh .

RUN ln -s /etc/nginx/sites-available/head-detached.com /etc/nginx/sites-enabled/

COPY . .

RUN mkdir public/images/uploads

VOLUME ["/etc/letsencrypt", "/etc/ssl", "public/images/uploads"]

ENTRYPOINT ["bash", "main.sh"]

EXPOSE 5000
EXPOSE 5001
