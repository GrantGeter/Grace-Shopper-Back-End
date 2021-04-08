const express = require('express');
const server = express();



const cors = require('cors');
server.use(cors());

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

require('dotenv').config();
const client = require('./db/client');

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { PORT = 3030 } = process.env

server.listen(PORT, () => {
  console.log('server is up on ', PORT);
  client.connect();
})

