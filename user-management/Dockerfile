# Dockerfile for User Management Service
FROM node:20.12.2
WORKDIR /user-management
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9421
CMD ["node", "server.js"]
