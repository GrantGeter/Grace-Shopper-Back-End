const client = require('./client');

async function createOrder({ userId, productId, quantity }){
    try {
        const { rows: [ order ] } = await client.query(`
          INSERT INTO orders(userId, productId, quantity) 
          VALUES($1, $2, $3)
          RETURNING *;
        `, [ userId, productId, quantity ]);
    
        return order;
        }catch(error){
        throw error
        }
    }

async function getOrderById(id){
    try {
        const { rows: [ order ] } = await client.query(`
            SELECT *
            FROM orders
            WHERE id=${ id }
            RETURNING *;
        `);
        
            return order;
            }catch(error){
            throw error
        }
    }

async function getOrderByUser(id){
    try {
        const { rows: [ order ] } = await client.query(`
            SELECT *
            FROM orders
            WHERE "userId"=${id}
            RETURNING *;
        `);
    
            return order;
            }catch(error){
            throw error
            }
        }

async function addProductToOrder({ id, productId, quantity }){
    try {
        const { rows: [ order ] } = await client.query(`
            UPDATE order
            SET "productId" = $2, quantity = $3
            WHERE id=$1
            RETURNING *;
        `, [id, productId, quantity]);
                
            return order;
            }catch(error){
            throw error
            }
        }

module.exports = {
    createOrder,
    getOrderById,
    getOrderByUser,
    addProductToOrder
}        