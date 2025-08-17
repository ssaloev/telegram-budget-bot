# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json + lockfile first (for caching)
COPY package*.json tsconfig.json ./

# Install all deps (prod + dev for build)
RUN npm install

# Copy source
COPY src ./src

# Build project (esbuild)
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only required files
COPY package*.json ./
RUN npm install --omit=dev

# Copy dist from builder
COPY --from=builder /app/dist ./dist

# Set env
ENV NODE_ENV=production
ENV PORT=8080

# Expose port (only needed if you run webhook HTTP server)
EXPOSE 8080

# Start bot
CMD ["node", "dist/index.js"]