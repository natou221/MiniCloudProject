# Étape 1 : build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production=false

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# Étape 2 : image finale
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/index.js"]
