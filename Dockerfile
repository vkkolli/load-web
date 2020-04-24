# Stage 0: Complie and Build Angular App
FROM node:lts-alpine as build-stage
ARG configuration=production

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
RUN npm install --quiet node-gyp -g

COPY package.json package-lock.json ./
RUN npm set progress=false && npm set audit=false && npm set loglevel=error
# RUN npm install
RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app
RUN ./node_modules/.bin/ngcc --properties es2015

COPY . .
# RUN npm run build --  --output-path=./dist/out --configuration $configuration
RUN npm run build -- --configuration $configuration --output-path=./dist/out

# Stage 1: Serve Angular app using nginx
FROM nginx:alpine

COPY --from=build-stage /ng-app/dist/out/ /usr/share/nginx/html
# Copy the default nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
