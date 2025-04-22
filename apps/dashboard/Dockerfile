# === Build Stage ===
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm nx build dashboard

# === Production Stage ===
FROM nginx:alpine

# Remove default nginx static site
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular output from build container
COPY --from=builder /app/dist/apps/dashboard /usr/share/nginx/html

# Optional: add your own nginx config here if needed
