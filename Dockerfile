FROM node:alpine

ENV TZ /usr/share/zoneinfo/America/Los_Angeles

ARG GIT_URL=https://github.com/facebook/react.git

RUN apk update && apk add git

RUN git clone $GIT_URL react

RUN cd react && yarn && yarn build --type=UMD_DEV

# Build DOM fixtures
RUN cd react/fixtures/dom/ && yarn && yarn prestart && yarn build

# Run the server
CMD cd react/fixtures/dom/ && yarn start

HEALTHCHECK CMD nc -vz localhost 3000

# Let us access the DOM fixtures server
EXPOSE 3000