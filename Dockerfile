FROM node:16-alpine3.16

WORKDIR /code

COPY package.json yarn.lock ./
RUN yarn install --force
