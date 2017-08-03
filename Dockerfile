FROM node:7.10.1

COPY . /opt/fromlatest.io

WORKDIR /opt/fromlatest.io

RUN npm install -g grunt-cli babel && \
      npm install

RUN make build

EXPOSE 5000

CMD ["make", "run"]
