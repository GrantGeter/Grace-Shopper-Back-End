const client = require('./client');

async function addProductToOrder({ id }, { productId, quantity }) {
    try {
        const { rows: [order] } = await client.query(`
          INSERT INTO orders("userId", "productId", quantity) 
          VALUES($1, $2, $3)
          RETURNING *;
        `, [id, productId, quantity]);

        return order;
    } catch (error) {
        throw error
    }
}

async function updateOrder({ orderId }, updatedOrder) {
    const setString = Object.keys(updatedOrder).map((key, index) => {
        return `${key}=$${index + 1}`
    }).join(', ')
    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=${orderId}
        `, Object.values(updatedOrder));
    } catch {
        throw error;
    }
}

async function deleteOrder({ orderId }) {
    const { rows: [order] } = await client.query(`
        DELETE FROM orders
        WHERE id=$1
        RETURNING *;
    `, [orderId]);
    return order;
}

async function getOrderById({ orderId }) {
    try {
        const { rows: [order] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=${orderId};
        `);

        return order;
    } catch (error) {
        throw error
    }
}

async function getOrdersByProduct(id) {
    try {
        const { rows } = await client.query(`
            SELECT * FROM orders
            WHERE "productId"=${id};
        `);
    } catch (error) {
        throw error;
    }
}

async function getOrdersByUser({ id }) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=${id} AND active=false;
        `);

        return rows;
    } catch (error) {
        throw error
    }
}

async function getActiveOrdersByUser({ id }) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=${id} AND active=true;
        `);

        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getOrderById,
    getOrdersByUser,
    getActiveOrdersByUser,
    getOrdersByProduct,
    addProductToOrder,
    updateOrder,
    deleteOrder
};