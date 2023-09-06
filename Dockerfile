FROM node:20.6 as build-stage

RUN groupadd -r runner && useradd --no-log-init -r -g runner runner

WORKDIR /workdir
COPY package.json ./
RUN yarn install

COPY --chown=runner:runner . .

RUN yarn build

FROM nginxinc/nginx-unprivileged:latest as production-stage
USER root
ARG client_max_body_size
COPY --chown=nginx:root ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage --chown=nginx:root /workdir/dist /usr/share/nginx/html

USER nginx
CMD ["nginx","-g","daemon off;"]