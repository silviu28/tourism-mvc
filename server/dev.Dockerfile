FROM node:22 AS start-stage

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]


FROM node:22 AS test-stage

WORKDIR /usr/src/app

COPY --from=start-stage /usr/src/app .

RUN npm run test
