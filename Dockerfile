FROM node:latest

COPY . .

RUN yarn install

CMD yarn start