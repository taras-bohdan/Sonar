FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

# TODO build based on env
#CMD if [ ${APP_ENV} = production ]; \
#	then \
#	npm run build
#	else \
#	npm start; \
#	fi
CMD npm start

EXPOSE 3000
