const express = require('express');
const productsRouter = express.Router();
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsByCategory,
    getProductByName,
    getProductById,
} = require('../db/index');
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
            message
        })
    }
})

productsRouter.get('/id/:id', async (req, res, next) => {

    try {
        const Product = await getProductById(req.params); // productId
        res.send(Product)
    } catch ({ name, message }) {
        next({
            name: "getProductByIdError",
            message
        })
    }
})

productsRouter.get('/category/:category', async (req, res, next) => {

    try {
        const allProducts = await getAllProductsByCategory(req.params); //categoryId
        res.send(allProducts)
    } catch ({ name, message }) {
        next({
            name: "getAllProductsByCategoryError",
            message
        })
    }
})

productsRouter.post('/', async (req, res, next) => {

    try {
        const product = await createProduct(req.body); // name, description, category, photos, price
        res.send(product)
    } catch ({ name, message }) {
        next({
            name,
            message
        })
        // next({
        //     name: "createProductError",
        //     message: "There was an error adding this product"
        // })
    }
})

productsRouter.patch('/update/:productId', async (req, res, next) => {

    try {
        const product = await updateProduct(req.params, req.body); // productId
        res.send(product)
    } catch ({ name, message }) {
        next({
            name: "updateProductError",
            message: "There was an error updating this product"
        })
    }
})

productsRouter.delete('/delete/:productId', async (req, res, next) => {

    try {
        const product = await deleteProduct(req.params); // productId
        res.send(product)
    } catch ({ name, message }) {
        next({
            name: "deleteProductError",
            message
        })
    }
})

module.exports = productsRouter;