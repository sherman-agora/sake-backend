FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install && yarn cache clean
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN yarn run build

ADD ./wait /wait
RUN chmod +x /wait
EXPOSE 3000
CMD /wait && yarn run start:docker
