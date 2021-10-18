FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
RUN yarn

RUN chown node:node /usr/app
RUN chown -R node:node node_modules
COPY --chown=node:node . .

USER node

CMD ["yarn", "start"]
