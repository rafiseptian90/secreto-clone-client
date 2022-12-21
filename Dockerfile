# Stage 1 : Install Dependencies
FROM node:18-alpine as dependencies

WORKDIR /app

COPY package*.json .

RUN npm install --frozen-lockfile

# Stage 2 : Build the Image
FROM node:18-alpine as builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Stage 3 : Runner
FROM node:18-alpine as runner

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["node", "server.js"]