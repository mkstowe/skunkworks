FROM node:20

WORKDIR /app

# Copy only what's needed
COPY . .

# Use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install

# Build the backend if needed (optional)
# RUN pnpm run build

# Start the server
CMD ["pnpm", "start"]
