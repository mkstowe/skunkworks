FROM node:18-alpine
WORKDIR /app

COPY . .
RUN npm install -g pnpm && pnpm install

# Build the backend app
RUN npx nx build dashboard-server

# Run the backend
CMD ["node", "dist/apps/dashboard-server/main.js"]
EXPOSE 3000