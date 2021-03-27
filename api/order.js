const express = require('express');
const orderRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    createOrder,
    getOrderById,
    getOrderByUser,
    addProductToOrder
} = require('../db/index');

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /order");
    next();
})

orderRouter.get('/', requireUser, async (req, res, next) => {

    try {
        const orderItems = await getOrderByUser(req.user);  // userId
        res.send(orderItems)
    } catch ({ name, message }) {
        next({
            name: "getOrderByUserError",
            message: "There was an error getting User Order"
        })
    }
})

orderRouter.post('/', requireUser, async (req, res, next) => {

    try {
        const order = await createOrder(req.user, req.body);  // userId, productId, quantity
        res.send(order)
    } catch ({ name, message }) {
        next({
            name: "createOrderError",
            message: "There was an error creating Order"
        })
    }
})

orderRouter.get('/:orderId', requireUser, async (req, res, next) => {

    try {
        const orderItems = await getOrderById(req.params);  // orderId
        res.send(orderItems)
    } catch ({ name, message }) {
        next({
            name: "getOrderByIdError",
            message: "There was an error getting Order"
        })
    }
})

orderRouter.patch('/:orderId', requireUser, async (req, res, next) => {

    try {
        const orderItems = await addProductToOrder(req.params, req.body) // orderId, productId, quantity      
        res.send(orderItems)
    } catch ({ name, message }) {
        next({
            name: "updateOrderError",
            message: "There was an error updating Order"
        })
    }
})

module.exports = orderRouter;