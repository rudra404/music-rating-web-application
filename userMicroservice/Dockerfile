FROM node:14 as Production

ENV NODE_ENV=development

WORKDIR /app

RUN npm install -g nodemon

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3002
# required for docker desktop port mapping

# RUN npm start
CMD ["npm", "run", "dev"]
