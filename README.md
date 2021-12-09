# FROM:latest (fromlatest.io)

This is a client javascript site to review and analyze a Dockerfile for common mistakes and use of best practices.

## Use Docker

* Build Docker Image
```bash
docker build -t fromlatest.io .
```
* Run Container
```bash
docker run -it --name fromlatest.io -p 5000:5000 fromlatest.io
```

## Installation
```bash
sudo npm install -g grunt-cli babel
npm install
```

## Build
- `make clean`
- `make deps`
- `make run`

## Serve frontend build
`http://127.0.0.1:5000/`

```bash
make run
```
