# official Node runtime as a parent image
FROM --platform=linux/amd64 node:18 AS BUILD_IMAGE

# base image
ARG APP_PATH=/ecosystem-app
WORKDIR ${APP_PATH}
USER root
COPY package.json ./
RUN yarn

# # final image 
FROM --platform=linux/amd64 node:18 AS APP_IMAGE
ARG APP_PATH=/ecosystem-app
WORKDIR ${APP_PATH}
RUN mkdir -p $APP_PATH/node_modules

COPY --from=BUILD_IMAGE $APP_PATH/node_modules ./node_modules
COPY . .

## Install Git
RUN apt-get -y update
RUN apt-get -y install git


## Set up global Git user
RUN git config --global user.email "aamiralam1991@gmail.com" && \
    git config --global user.name "Aamir Alam"

## clone dapp registory repo

RUN git clone "https://github.com/api3dao/dapp-registry.git"
ARG APP_PATH=/ecosystem-app/dapp-registry
WORKDIR ${APP_PATH}
RUN yarn
RUN yarn build


ARG APP_PATH=/ecosystem-app
WORKDIR ${APP_PATH}


RUN yarn build

EXPOSE  3000 80



##development
# CMD ["yarn", "dev"]

##production
CMD ["node", ".output/server/index.mjs"]