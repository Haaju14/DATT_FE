FROM node:18 as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

# Copy build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
