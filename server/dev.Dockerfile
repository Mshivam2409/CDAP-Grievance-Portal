FROM node:12.18.2
RUN mkdir server
WORKDIR /server
ADD ./ ./
EXPOSE 8000
CMD [ "yarn", "run dev" ]