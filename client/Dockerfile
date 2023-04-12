FROM node:14 as Production

WORKDIR /app

run npm install -g serve 

COPY package.json . 

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

# start the application
CMD ["serve", "-s", "build"] 