FROM node:20

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm nx build dashboard

FROM nginx:alpine
COPY --from=0 /app/dist/apps/dashboard /usr/share/nginx/html
