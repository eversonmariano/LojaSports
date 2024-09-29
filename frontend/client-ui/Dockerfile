FROM node:20-alpine AS build-stage 

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 3000