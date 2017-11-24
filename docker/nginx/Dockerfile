FROM arm64v8/nginx:stable

MAINTAINER Jahn Estacado

RUN apt-get update && apt-get install -y envsubst

COPY nginx.conf /etc/nginx/
COPY estacadoslair.com /etc/nginx/site-available
RUN envsubst < /etc/nginx/site-available > /etc/nginx/site-available
RUN ln -s /etc/nginx/site-available /etc/nginx/site-enabled

COPY ../../public public

VOLUME ["/etc/letsencrypt", "/etc/ssl"]

ENTRYPOINT ["service", "nginx", "start"]

EXPOSE 5000
EXPOSE 5001
