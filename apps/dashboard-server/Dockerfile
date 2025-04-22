FROM node:20

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm nx build dashboard-server

CMD ["node", "dist/apps/dashboard-server/main.js"]
