# Dockerfile for Order Management Service
FROM node:20.12.2
WORKDIR /order-management
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8828
CMD ["node", "server.js"]
