FROM node:latest

RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

#USER node
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD false

WORKDIR /simple_test_framework

COPY --chown=node package.json .
COPY --chown=node package-lock.json .

RUN npm install

USER node

COPY --chown=node . /simple_test_framework