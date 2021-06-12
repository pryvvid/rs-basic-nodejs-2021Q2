FROM node:14.17-alpine
WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install
COPY . /usr/app/
EXPOSE ${PORT}
CMD ["npm", "run", "start"]