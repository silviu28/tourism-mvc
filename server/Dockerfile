FROM node:22

WORKDIR /usr/src/app

RUN npm ci

ENV DEBUG=playground:*

USER node

CMD ["npm", "start"]