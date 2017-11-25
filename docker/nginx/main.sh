#!/bin/bash

#envsubst < /etc/nginx/sites-available/estacadoslair.com > /etc/nginx/sites-available/estacadoslair.com
sed -i -e 's|ESTACADOSLAIR_SERVICE_URI|'$ESTACADOSLAIR_SERVICE_URI'|g' etc/nginx/sites-available/estacadoslair.com

nginx -g "daemon off;"
