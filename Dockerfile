FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
RUN yarn

RUN chown node:node /usr/app
COPY --chown=node:node . .

RUN chown -R node:node node_modules

USER node

CMD ["yarn", "start"]
