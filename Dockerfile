FROM node:20 AS build-stage

WORKDIR /workdir

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc && npx vite build

FROM nginxinc/nginx-unprivileged:latest AS production-stage
USER root
ARG client_max_body_size
COPY --from=build-stage --chown=nginx:root /workdir/dist /usr/share/nginx/html
COPY --chown=nginx:root default.conf /etc/nginx/conf.d/default.conf
USER nginx
