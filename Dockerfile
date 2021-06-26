FROM node:14.17-alpine
ENV PORT=4000
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]