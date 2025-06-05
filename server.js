const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

module.exports = { app, httpServer };