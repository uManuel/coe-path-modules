FROM node:latest

WORKDIR /app

COPY . /app

# Anonimous volume so will be destroyed after the container It's stopped.
# VOLUME [ "/app/feedback" ]

RUN npm install

CMD [ "node", "server.js" ]