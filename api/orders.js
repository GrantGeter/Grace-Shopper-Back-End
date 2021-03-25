const express = require('express');
const orderRouter = express.Router();
const { requireUser } = require('./utils');
const { getUserOrderItems } = require('../db/index');

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /order");
    next();
})

orderRouter.get('/:orderId', requireUser, async (req, res, next) => {
    try {
        const cartItems = await getUserOrderItems(req.user);  // userId
        res.send(cartItems)
    } catch ({name, message}) {
        next({
            name: "getUserOrderItemsError",
            message: "There was an error getting Cart Items"
        })
    }
})

orderRouter.patch('/:orderId', requireUser, async (req, res, next) => {  

    try {
        const cartItems = await updateOrder() //orderId
    } catch (error) {
        next(error)
    }
})

module.exports = ordersRouter;