FROM node:lts-alpine as build  
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .  
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN yarn build
  
FROM nginx:stable-alpine  
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]

# # Stage 1: Build the frontend
# FROM node:lts-alpine as build
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# ENV NODE_OPTIONS="--max-old-space-size=4096"
# RUN yarn build

# # Stage 2: Set up Nginx with Certbot
# FROM nginx:stable-alpine

# # Install Certbot and bash
# RUN apk add --no-cache certbot certbot-nginx bash

# # Copy the frontend build from the previous stage
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy the custom Nginx config file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose HTTP and HTTPS ports
# EXPOSE 80 443

# # Copy the entrypoint script
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# # Set the entrypoint
# ENTRYPOINT ["/entrypoint.sh"]

