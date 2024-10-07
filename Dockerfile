# FROM node:lts-alpine as build  
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .  
# ENV NODE_OPTIONS="--max-old-space-size=4096"
# RUN yarn build
  
# FROM nginx:stable-alpine  
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80  
# CMD ["nginx", "-g", "daemon off;"]

# 1. Build the frontend application
FROM node:lts-alpine as build  
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .  
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn build

# 2. Use nginx:stable-alpine and add Certbot for SSL
FROM nginx:stable-alpine

# Install Certbot
RUN apk add --no-cache certbot certbot-nginx bash

# Copy the frontend build from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx config file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Start Nginx and Certbot
CMD ["sh", "-c", "nginx -g 'daemon off;' & certbot --nginx -d taelimasset.com --non-interactive --agree-tos --email ckd0523@naver.com --redirect"]
