FROM node:12.18.2
RUN mkdir client
WORKDIR /client
ADD ./ ./
EXPOSE 3000
CMD [ "yarn", "start" ]