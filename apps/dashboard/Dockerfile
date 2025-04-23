FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install

# Build the Angular app
RUN npx nx run dashboard:build:development
RUN ls -la /app/dist/apps/dashboard

# Serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist/apps/dashboard/browser /usr/share/nginx/html
EXPOSE 80