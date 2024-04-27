FROM node:18

RUN apt-get update && apt-get install -y tzdata

RUN ln -fs /usr/share/zoneinfo/Europe/Kyiv /etc/localtime

RUN dpkg-reconfigure --frontend noninteractive tzdata

WORKDIR /app

COPY . .

RUN npm install

CMD [ "node", "index.js" ]
