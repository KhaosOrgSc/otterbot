from node:8

WORKDIR /usr/app/src
COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
