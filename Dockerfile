FROM node
WORKDIR /usr/src/app
ENV TZ=Europe/Paris
RUN apt-get update && apt-get install -y tzdata
RUN chmod -R 777 .
RUN npm install -g @angular/cli