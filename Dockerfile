# start FROM a base layer of node v18.13
FROM node:18.13

# Set up a WORKDIR for application in the container
WORKDIR /usr/src/app

# copy all of our application files to the WORKDIR in the container
COPY . /usr/src/app

# npm install to create node_modules in the container
RUN npm install

# build for production
RUN npm run build:client

RUN npm run build:server

# EXPOSE server port in the container
EXPOSE 3000

# Start the server
CMD [ "npm", "run", "start:docker" ] 


# docker build -t sf-prod .
# docker run --name sf-prod-container -p 8080:3000 sf-prod