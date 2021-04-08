const client = require('./client');
const { getOrdersByProduct, deleteOrder } = require('./order');

const createProduct = async ({ name, description, category, photos, price }) => {
    const { rows: [product] } = await client.query(`
        INSERT INTO products(name, description, category, photos, price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `, [name, description, category, photos, price]);
    return product;
}

const updateProduct = async ({ productId }, { name, description, category, photos, price }) => {
    const { products } = await client.query(`
        UPDATE products
        SET name=$1, description=$2, category=$3, photos=$4, price=$5
        WHERE id=${productId}
        RETURNING *;
    `, [name, description, category, photos, price]);
    return products;
}

const deleteProduct = async ({ productId }) => {
    const { rows: [product] } = await client.query(`
        DELETE FROM products
        WHERE id=$1
        RETURNING *;
    `, [productId]);

    const ordersWithProducts = await getOrdersByProduct(productId);
    ordersWithProducts.forEach(async order => {
        await deleteOrder(order);
    });
}

const getAllProducts = async () => {
    const { rows: products } = await client.query(`
        SELECT * FROM products;
    `);
    return products;
}

const getProductById = async ({ id }) => {
    const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE id=($1);
    `, [id]);
    return product;
}

const getProductByName = async ({ name }) => {
    const { rows: [product] } = await client.query(`
        SELECT * FROM products
        WHERE name=($1);
    `, [name]);
    return product;
}

const getAllProductsByCategory = async ({ category }) => {
    const { rows: products } = await client.query(`
        SELECT * FROM products
        WHERE category=($1);
    `, [category]);
    return products;
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsByCategory,
    getProductByName,
    getProductById,

}