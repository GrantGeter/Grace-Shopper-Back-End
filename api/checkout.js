const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
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
        success_url: 'https://boringt-shirtcompany.netlify.app/completed',
        cancel_url: 'https://boringt-shirtcompany.netlify.app/cart',
    });

    res.send({ id: session.id });
})

module.exports = checkoutRouter;