FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/client/build /app/client/build
COPY package.json yarn.lock ./
RUN yarn install
COPY server.js .
EXPOSE 3000
CMD [ "yarn", "start" ]