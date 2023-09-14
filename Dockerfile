FROM node:slim

RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_PAHT /usr/bin/google-chrome
ENV GENERATE_COVERAGE_REPORT false

WORKDIR /simple_test_framework
RUN chown -R node.node /simple_test_framework

COPY --chown=node package.json .
COPY --chown=node package-lock.json .

RUN npm i -D nyc
RUN npm install

USER node

COPY --chown=node . /simple_test_framework

CMD ["/bin/sh", "run.sh"]