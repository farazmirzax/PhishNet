#Stage 1: BUILD
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#Stage 2: SERVING THE APP WITH NGINX
FROM nginx:alpine
#copying the build files from stage 1 into nginx
COPY --from=builder /app/dist /usr/share/nginx/html
#exposing port 80 (its a standard HTTP port)
EXPOSE 80
#start nginx
CMD ["nginx", "-g", "daemon off;"]