const express = require('express');
const orderRouter = express.Router();
const { requireUser } = require('./utils');
const {
    getOrderById,
    getOrdersByUser,
    getActiveOrdersByUser,
    addProductToOrder,
    setOrderToInactive
} = require('../db/index');

orderRouter.use((req, res, next) => {
    console.log("A request is being made to /order");
    next();
})

orderRouter.get('/', requireUser, async (req, res, next) => {

    try {
        const orders = await getActiveOrdersByUser(req.user);  // userId
        res.send(orders)
    } catch ({ name, message }) {
        next({
            name: "getOrderByUserError",
            message
        })
    }
})

orderRouter.post('/', requireUser, async (req, res, next) => {

    try {
        const order = await addProductToOrder(req.user, req.body);  // userId, productId, quantity
        res.send(order)
    } catch ({ name, message }) {
        next({
            name: "createOrderError",
            message
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
        const order = await setOrderToInactive(req.params) // orderId, productId, quantity      
        res.send(order)
    } catch ({ name, message }) {
        next({
            name: "updateOrderError",
            message: "There was an error updating Order"
        })
    }
})

orderRouter.delete('/:orderId', requireUser, async (req, res, next) => {

    try {
        const order = await deleteOrder(req.params) // orderId, productId, quantity      
        res.send(order)
    } catch ({ name, message }) {
        next({
            name: "updateOrderError",
            message: "There was an error updating Order"
        })
    }
})

module.exports = orderRouter;