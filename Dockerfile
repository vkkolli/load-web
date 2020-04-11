FROM node:lts-alpine as build-stage
ARG configuration=production

WORKDIR /app
COPY package*.json /app/
# RUN npm install
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app
COPY . .

RUN ./node_modules/.bin/ngcc --properties es2015
# RUN npm run build --  --output-path=./dist/out --configuration $configuration
RUN npm run nghm -- build --progress=false --aot=true --vendor-chunk --output-path=./dist/out --configuration $configuration

FROM nginx:alpine

COPY --from=build-stage /ng-app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY --from=build-stage /ng-app/nginx.conf /etc/nginx/conf.d/default.conf
