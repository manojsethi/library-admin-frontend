# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies based on the lock file
# Leverage caching: only re-download dependencies if package.json or package-lock.json changes
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project files into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the app in a lightweight environment
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
