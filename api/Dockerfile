FROM node:alpine
RUN mkdir /usr/landingdev5
WORKDIR /usr/landingdev5
ADD ./package.json package.json
ADD ./index.js index.js
ADD ./utils.js utils.js
RUN mkdir templates
ADD ./templates/contacto.ect templates/contacto.ect
RUN npm install
EXPOSE 3000
