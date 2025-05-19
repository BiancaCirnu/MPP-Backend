FROM node:18

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3001

CMD ["npm", "start"]