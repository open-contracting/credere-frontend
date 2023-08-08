FROM node:20.2.0-alpine3.16 as build

WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

FROM nginx:1.25.1-alpine
ARG client_max_body_size
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN sed -i "/listen[ ]*80;/i client_max_body_size ${client_max_body_size}M;" /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]