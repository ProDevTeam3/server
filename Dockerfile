FROM node:alpine
WORKDIR /opt/server
COPY ./package.json .
RUN yarn install
COPY . .
RUN yarn babel
CMD ["yarn", "prod"]