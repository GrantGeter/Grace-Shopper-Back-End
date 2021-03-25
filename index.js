const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors');
server.use(cors());

require('dotenv').config();
const client = require('./db/client')

const { PORT = 3000 } = process.env

// const apiRouter = require('./api');
// server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('The server is up on port ', PORT);
    client.connect();
})