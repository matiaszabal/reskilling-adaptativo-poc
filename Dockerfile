# Use Node.js for building the Next.js app
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a lean base for the production image
FROM node:20-slim AS runner
WORKDIR /app

# Install Python and curl
RUN apt-get update && apt-get install -y python3 python3-pip curl && \
    rm -rf /var/lib/apt/lists/*

# Install uv for Python package management (needed for notebooklm-mcp)
RUN curl -LsSf https://github.com/astral-sh/uv/releases/latest/download/uv-installer.sh | sh
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy built assets and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/python-services ./python-services
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/app ./app

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
