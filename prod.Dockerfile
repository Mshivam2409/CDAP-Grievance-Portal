FROM node:12.18.2
RUN mkdir build
WORKDIR /build
ADD build/ ./
ENV NODE_ENV=production
ENV PORT=5000
ENV DIR=.
ENV BUILD_DIRECTORY=web
ENV NODE_PATH=./
ENV DATABASE_DIR=data/audio
EXPOSE 5000
RUN yarn install
RUN yarn global add pm2 
ENV PM2_PUBLIC_KEY pvy1kpyghqx0l5o
ENV PM2_SECRET_KEY 6cdlrds5lygwtai
CMD ["pm2-runtime", "index.js"]
