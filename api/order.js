const express = require('express');
const orderRouter = express.Router();
const { requireUser } = require('./utils');
const {
    getOrderById,
    getOrdersByUser,
    getActiveOrdersByUser,
    addProductToOrder,
    updateOrder,
    deleteOrder
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

orderRouter.get('/completed_orders', requireUser, async (req, res, next) => {

    try {
        const orders = await getOrdersByUser(req.user);  // userId
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

orderRouter.get('/:orderId', async (req, res, next) => {

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
    console.log(req.body);
    try {
        const order = await updateOrder(req.params, req.body);
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
            message
        })
    }
})

module.exports = orderRouter;