const express = require('express');
const server = express();

const apiRouter = require('./api');
server.use('/api', apiRouter);