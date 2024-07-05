# Dockerfile for Authentication Service
FROM node:20.12.2
WORKDIR /authentication-service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9423
CMD ["node", "server.js"]
