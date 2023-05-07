FROM node:14 as Production

ENV NODE_ENV=development
ENV PORT=3002

WORKDIR /app

RUN npm install -g nodemon

COPY package.json ./
COPY package-lock.json ./

RUN npm install
# RUN npm install --only=production
# for installing only production dependencies

COPY . .

EXPOSE $PORT
# required for docker desktop port mapping

# RUN npm start
#CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
CMD npm start

