FROM node:latest

COPY package-lock.json package.json .

RUN yarn install

COPY . .

CMD yarn start