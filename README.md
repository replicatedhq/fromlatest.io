# FROM:latest (fromlatest.io)

This is a client javascript site to review and analyze a Dockerfile for common mistakes and use of best practices.

## Installation
```bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get install build-essential nodejs
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
