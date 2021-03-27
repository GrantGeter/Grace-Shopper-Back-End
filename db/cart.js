const client = require('./client');

const getUserCartItems = async ({ cartId }) => {

    const { rows: cartItems } = await client.query(`
    SELECT * FROM cart
    WHERE id=$1
    `, [cartId]);
    return cartItems;

}

const updateCart = async ({ cartId, orders }) => {

    const { rows: cart } = await client.query(`
        UPDATE cart
        SET orders='{${ [...orders].join() }}'
        WHERE id=$1
        RETURNING *;
    `, [cartId]);
    return cart;
}

const deleteCart = async ({ cartId }) => {

    const { rows: [ cart ] } = await client.query(`
        DELETE FROM cart
        WHERE id=$1
        RETURNING *;
    `, [cartId]);
}

const completedCart = async ({ cartId }) => {

    const { rows: [ cart ] } = await client.query(`
        UPDATE cart
        SET comleted=true
        WHERE id=$1
        RETURNING *;
    `, [cartId]);
    return cart;
}

module.exports = {
    getUserCartItems,
    updateCart,
    deleteCart,
    completedCart
};