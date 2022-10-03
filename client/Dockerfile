#issue with latest version of node, had to install using version 16
FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]