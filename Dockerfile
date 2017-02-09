# Change latest to your desired node version (https://hub.docker.com/r/library/node/tags/)
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --silent
COPY . /usr/src/app

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/logs
RUN npm install mocha -g --silent
RUN npm install mocha-co -g --silent
RUN mocha tests

CMD [ "npm", "start" ]
