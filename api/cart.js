const express = require('express');
const cartRouter = express.Router();
const requireUser = require('./utils');
const { getAllUserCartItems } = require('../db/index');

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
})

cartRouter.get('/', async (req, res, next) => {
    try {
        const cartItems = await getAllUserCartItems(userId);
        res.send(cartItems)
    } catch ({name, message}) {
        next({
            name: "getAllUserCartItemsError",
            message: "There was an error getting Cart Items"
        })
    }
})

routinesRouter.patch('/:cartId', requireUser, async (req, res, next) => {     
    req.body.id = req.params.cartId

    try {
        const cartItems = await updateCart(req.body)
        res.send(cartItems)
    } catch (error) {
        next(error)
    }
})

module.exports = cartRouter;