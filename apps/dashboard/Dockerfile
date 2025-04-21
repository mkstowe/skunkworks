# Stage 1: Build Angular app
FROM node:20 AS build

WORKDIR /app

# Copy repo files
COPY . .

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install

# Build Angular app via NX
RUN pnpm nx build dashboard

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built app from previous stage
COPY --from=build /app/dist/apps/dashboard /usr/share/nginx/html

# Optional: custom nginx config
# COPY nginx.conf /etc/nginx/nginx.conf
