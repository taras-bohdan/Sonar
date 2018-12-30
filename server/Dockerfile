FROM node:11

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

WORKDIR /usr/src/app
COPY . /usr/src/app

# Update apt repository
# Install libpcap
RUN apt-get update \
    && apt-get install -y libpcap-dev=1.8.1-3 --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install

# TODO build based on env
#CMD if [ ${APP_ENV} = production ]; \
#	then \
#	npm run build && \
#	cd dist && \
#	node index.js \
#	else \
#	npm start; \
#	fi
CMD npm start

EXPOSE 5500
