# filepath: c:\Users\1807a\OneDrive\Desktop\c\safarseva\Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 8080
CMD ["node", "one.js"]
