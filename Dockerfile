
FROM node:14-alpine as builder
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY theme ./theme
COPY babel.config.js rollup.config.js tsconfig.json ./
ARG base_url=''
RUN BASE_URL=$base_url npm run build


FROM nginx:alpine
RUN mkdir -p /var/log/nginx /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /frontend/public/build /var/www/html
RUN chown nginx:nginx /var/www/html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
