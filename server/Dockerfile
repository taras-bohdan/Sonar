FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

WORKDIR /usr/src/app
COPY . /usr/src/app

# Update apt repository
RUN apt-get update
# Install libpcap
RUN apt-get install -y libpcap-dev

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
