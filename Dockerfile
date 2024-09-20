FROM node:lts-alpine as build  
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .  
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN yarn build
  
FROM nginx:stable-alpine  
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]