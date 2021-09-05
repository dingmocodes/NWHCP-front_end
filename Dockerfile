FROM nginx

COPY /public /usr/share/nginx/html
COPY vhost.conf /etc/nginx/conf.d/default.conf

# install certbot and get cert
RUN apt-get update && apt-get install certbot -y
RUN certbot certonly --register-unsafely-without-email --agree-tos --preferred-challenges http --nginx -d nwhealthcareerpath.uw.edu

CMD ["nginx", "-g", "daemon off;"]
