#!/bin/bash

sed -i -e 's|APP_SERVER_URI|'$APP_SERVER_URI'|g' etc/nginx/sites-available/head-detached.com

nginx -g "daemon off;"
