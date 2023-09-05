#
#FROM node:14
#
#WORKDIR /app
#
#COPY . ./
#
#RUN npm install
#
#EXPOSE 8080
#
#CMD ["node", "./src/app.ts"]



FROM node:18

WORKDIR /app

COPY . .

#RUN apt-get update

#RUN apt-get install bcrypt

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]

