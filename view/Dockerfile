# Stage 1: Build Vite static production bundle
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Same-origin /api via reverse proxy (empty = relative URLs, no CORS)
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

# Build Vite frontend static assets into dist
RUN npm run build

# Stage 2: Serve compiled assets with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
