# Tahap 1: Builder untuk instalasi dan build TypeScript
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json dan package-lock.json untuk instalasi dependencies
COPY package*.json ./

# Instal dependencies, termasuk devDependencies
RUN npm ci

# Copy semua file source
COPY . .

# Build proyek TypeScript
RUN npm run build

# Tahap 2: Final image yang lebih kecil untuk produksi
FROM node:20-alpine

# Set working directory di container
WORKDIR /app

# Copy package.json dari builder untuk instalasi dependencies produksi
COPY --from=builder /app/package*.json ./

# Instal hanya dependencies produksi (tanpa devDependencies)
RUN npm ci --omit=dev

# Copy file hasil build dari tahap builder
COPY --from=builder /app/dist ./dist

# Copy file .env
COPY .env .env

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "dist/server.js"]