FROM node:20 AS build

WORKDIR /opt/app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY static ./static
COPY env.cloudrun ./.env
COPY *.config.js ./

ENV NODE_ENV=production
RUN npm run build

FROM node:20-slim

WORKDIR /opt

COPY --from=build /opt/app ./app

WORKDIR /opt/app

ENV NODE_ENV=production
CMD ["node", "build"]