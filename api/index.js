const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/index')


apiRouter.get('/test', async (req, res, next) => {
  console.log("A get request was made to /api");
  res.send({
    message: "It works!"
  });
})
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const authorization = req.header('Authorization');
  if (!authorization) {
    next();
  } else if (authorization.startsWith(prefix)) {
    const token = authorization.slice(prefix.length);
    try {
      const userId = jwt.verify(token, JWT_SECRET);
      if (userId) {
        const { id } = userId

        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    // console.log("User is set:", req.user);
  }
  next();
});

const checkoutRouter = require('./checkout');
apiRouter.use('/checkout', checkoutRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const orderRouter = require('./order');
apiRouter.use('/order', orderRouter)

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;