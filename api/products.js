const express = require('express');
const productsRouter = express.Router();
const { getAllProducts } = require('../db/index');
const { requireUser, requireAdmin } = require('./utils');

productsRouter.use((req, res, next) => {
    console.log("A request is being made to /products");
    next();
})

productsRouter.get('/', async (req, res, next) => {

    try {
        const allProducts = await getAllProducts();
        res.send(allProducts)
    } catch ({ name, message }) {
        next({
            name: "getAllProductsError",
            message: "There was an error getting Products"
        })
    }
})

productsRouter.get('/:id', async (req, res, next) => {

    try {
        const allProducts = await getAllProductsById(); // productId
        res.send(allProducts)
    } catch ({ name, message }) {
        next({
            name: "getAllProductsByIdError",
            message: "There was an error getting Products by Id"
        })
    }
})

productsRouter.get('/:category', async (req, res, next) => {

    try {
        const allProducts = await getAllProductsByCategory(); //categoryId
        res.send(allProducts)
    } catch ({ name, message }) {
        next({
            name: "getAllProductsByCategoryError",
            message: "There was an error getting Products by Category"
        })
    }
})

productsRouter.post('/', requireAdmin, async (req, res, next) => {

    try {
        const product = await createProduct(); // name, description, category, photos, price
        res.send(product)
    } catch ({ name, message }) {
        next({
            name: "createProductError",
            message: "There was an error adding this product"
        })
    }
})

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {

    try {
        const product = await updateProduct(); // productId
        res.send(product)
    } catch ({ name, message }) {
        next({
            name: "updateProductError",
            message: "There was an error updating this product"
        })
    }
})

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {

    try {
        const product = await deleteProduct(); // productId
        res.send(product)
    } catch ({ name, message }) {
        next({
            name: "deleteProductError",
            message: "There was an error deleting this product"
        })
    }
})










module.exports = productsRouter;