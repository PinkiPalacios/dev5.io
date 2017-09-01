FROM node:alpine
RUN mkdir /usr/landingdev5
WORKDIR /usr/landingdev5
ADD ./package.json package.json
ADD ./index.js index.js
RUN npm install
EXPOSE 3000
