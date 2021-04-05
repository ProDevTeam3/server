FROM node:alpine
WORKDIR /api
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn", "start"]