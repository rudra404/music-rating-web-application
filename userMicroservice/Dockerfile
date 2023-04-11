FROM node:14 as Production

# RUN npm install -g nodemon

WORKDIR /app

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

EXPOSE 3002
# required for docker desktop port mapping

CMD ["npm", "start"]
