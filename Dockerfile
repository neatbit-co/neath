FROM node:9.8.0-alpine

ENV NODE_ENV=production
ENV HOME=/home/node
WORKDIR $HOME/app

RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

RUN chown -R node:node $HOME/*
USER node

CMD [ "npm", "start" ]