FROM node:20-slim AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install

# Build the Angular app
RUN npx nx run dashboard:build:development

# Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/apps/dashboard/browser /usr/share/nginx/html
COPY apps/dashboard/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80