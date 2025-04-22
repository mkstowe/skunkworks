# === Build Stage ===
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm nx build dashboard

# === Nginx Stage ===
FROM nginx:alpine

# Clear default html
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular output
COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html

# Optional: fix permissions
RUN chmod -R 755 /usr/share/nginx/html
