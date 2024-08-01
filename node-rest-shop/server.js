const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8080;

const server = http.createServer(app); //express app variable qualifies as req handler

server.listen(port);
