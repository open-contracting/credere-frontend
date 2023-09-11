FROM node:20.6 as build-stage

WORKDIR /workdir

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

FROM nginxinc/nginx-unprivileged:latest as production-stage
USER root
ARG client_max_body_size
COPY --from=build-stage --chown=nginx:root /workdir/dist /usr/share/nginx/html
COPY --chown=nginx:root default.conf /etc/nginx/conf.d/default.conf
USER nginx
