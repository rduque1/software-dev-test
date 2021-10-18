# Software Development Test

Small express app that will show random dog images.

## Install

### Prerequisites

Requires node version >= 12 && <= 14

### Commands
```bash
yarn
# or
npm install
```

## Run
```bash
yarn start
# or
npm start
```
### Run with docker
```bash
docker build -t <my-image-name> .
docker run -it --rm -p 3000:3000 <my-image-name>
```


## Tests
```bash
yarn test
# or
npm test
```
