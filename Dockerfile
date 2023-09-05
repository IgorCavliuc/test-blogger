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

COPY package*.json ./

RUN npm cache clean --force
RUN npm install --legacy-peer-deps
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
