FROM node:16-alpine3.16

WORKDIR /code

COPY package.json package-lock.json ./
RUN yarn install --force
