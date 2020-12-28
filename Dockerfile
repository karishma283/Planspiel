# Taleh Muzaffarov
FROM node:11-alpine
COPY . /client
WORKDIR /client

RUN npm install --save
RUN npm run-script build
EXPOSE 8000
CMD ['cordova', 'run', 'browser']
