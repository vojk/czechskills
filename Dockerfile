# Stage 1: Build the application using Bun
FROM oven/bun:latest AS build

# Set working directory
WORKDIR /src

# Copy package files and install dependencies using Bun
COPY package.json bun.lockb ./

RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Nuxt app
RUN bun run build

# Stage 2: Run the application using npx
FROM node:18-alpine AS runner

# Copy the built application from the builder stage
COPY package.json ./

# Install only production dependencies
RUN npm config set loglevel verbose
RUN npm install -g node-gyp
RUN npm install

# Stage 3: Run the application using npx
FROM runner AS final

WORKDIR /app

# Copy source files into application directory
COPY --from=build /src/.output ./.output
COPY --from=build /src/server.mjs ./
COPY --from=build /src/.env ./

# Expose the specified port
ENV PORT=9999
EXPOSE ${PORT}

# Run the built Nuxt app using npx
CMD ["node", "server.mjs"]
