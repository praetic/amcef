FROM node:20.10.0

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]