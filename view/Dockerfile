FROM node:22 AS start-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

FROM node:22 AS build-stage

WORKDIR /usr/src/app

COPY --from=start-stage /usr/src/app .

RUN npm run build

FROM nginx:1.12.5

COPY --from=build-stage /usr/src/dist /usr/share/nginx/html

RUN npm install -g serve

CMD ["serve", "dist"]