FROM node:16.17.0
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 5454
CMD npm run dev
