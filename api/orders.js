const express = require('express');
const orderRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    getUserOrderItems,
    updateOrder
} = require('../db/index');

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /order");
    next();
})

orderRouter.get('/:orderId', requireUser, async (req, res, next) => {

    try {
        const orderItems = await getUserOrderItems();  // userId
        res.send(orderItems)
    } catch ({ name, message }) {
        next({
            name: "getUserOrderItemsError",
            message: "There was an error getting Cart Items"
        })
    }
})

orderRouter.patch('/:orderId', requireUser, async (req, res, next) => {

    try {
        const orderItems = await updateOrder() // orderId, productId, quantityId      
        res.send(orderItems)
    } catch ({ name, message }) {
        next({
            name: "updateOrderError",
            message: "There was an error updating Order"
        })
    }
})

module.exports = orderRouter;