FROM node:14 as Production

WORKDIR /app

RUN npm install -g serve 

COPY package.json . 

RUN npm install

COPY . .

#EXPOSE 3000
# Set environment variable for dynamic port
ENV PORT=3000
# Expose dynamic port
EXPOSE $PORT

# build the application
RUN npm run build

# start the application
#CMD ["serve", "-s", "build"]
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:${PORT}"]
