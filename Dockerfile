FROM node:14 as Production

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

EXPOSE 3000

# start the application
CMD ["npm", "start"] 