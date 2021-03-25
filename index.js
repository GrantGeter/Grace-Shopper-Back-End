const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());

const morgan = require('morgan');
server.use(morgan('dev'));

require('dotenv').config();
const client = require('./db/client');

const { PORT = 3000 } = process.env

// const apiRouter = require('./api');
// server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log('server is up on ', PORT);
    client.connect();
})
