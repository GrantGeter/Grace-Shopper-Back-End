const express = require('express');
const cartRouter = express.Router();
const { requireUser } = require('./utils');
const { 
    getUserCartItems,
    updateCart,
    deleteCart,
    completedCart
} = require('../db/index');

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /cart");
    next();
})

cartRouter.get('/:cartId', requireUser, async (req, res, next) => {
    try {
        const cartItems = await getUserCartItems(req.params);  // cartId
        res.send(cartItems)
    } catch ({ name, message }) {
        next({
            name: "getUserCartItemsError",
            message: "There was an error getting Cart Items"
        })
    }
})

cartRouter.patch('/:cartId', requireUser, async (req, res, next) => {

    if (req.body.completed == true) {
        try {
            const cartItems = await completedCart(); 
            res.send(cartItems)
        } catch ({ name, message }) {
            next({
                name: "completedCartError",
                message: "There was an error completing Cart transaction"
            })
        }
    }else {
        try {
            const cartItems = await updateCart(req.params, req.body) // cartId, orders-array of orders   
            res.send(cartItems)
        } catch ({ name, message }) {
            next({
                name: "updateCartError",
                message: "There was an error updating Cart Items"
            })
        }
    }    
})

cartRouter.delete('/:cartId', requireUser, async (req, res, next) => {

    try {
        const cartItems = await deleteCart(req.params) // cartId    
        res.send(cartItems)
    } catch ({ name, message }) {
        next({
            name: "deleteCartError",
            message: "There was an error deleting the Cart"
        })
    }
})

module.exports = cartRouter;