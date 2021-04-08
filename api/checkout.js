const stripe = require('stripe')('sk_test_51IdjzcA9fKf653FRhjjh9MPPuXUK7PiftsnN9EcDdZc3kHZQMFLqn0Rjmgi0ZNWn9b2pwas8f9o3dhBqBMmVxtYN00cRXhMoBA');
const express = require('express');
const { getProductById } = require('../db');
const checkoutRouter = express.Router();

checkoutRouter.post('/', async (req, res) => {
    const lineItems = await Promise.all(req.body.map(async order => {
        const product = await getProductById({ id: order.productId });
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name
                },
                unit_amount: product.price * 100
            },
            quantity: order.quantity
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/cart',
    });

    res.send({ id: session.id });
})

module.exports = checkoutRouter;