
FROM node:14-alpine as builder
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json ./
RUN npm install
COPY public ./public
COPY src ./src
COPY theme ./theme
COPY babel.config.js rollup.config.js tsconfig.json ./
# COPY . .
RUN npm run build

FROM nginx:alpine

# Create the directories we will need
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /frontend/public /var/www/html
RUN chown nginx:nginx /var/www/html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
