# Build frontend
FROM node:24-alpine AS build-frontend
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app/Frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# Runtime image
FROM node:24-alpine
WORKDIR /app

# Install backend deps
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm install --only=production

# Copy backend source
COPY Backend/ ./Backend/

# Copy built frontend
COPY --from=build-frontend /app/Frontend/dist ./Frontend/dist

ENV NODE_ENV=production
WORKDIR /app/Backend
EXPOSE 3000
CMD ["node", "src/server.js"]
