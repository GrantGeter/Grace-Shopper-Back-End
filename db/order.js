const client = require('./client');

async function createOrder({id, userId, productId, quantity}){
    try {
        const { rows: [ order ] } = await client.query(`
          INSERT INTO orders(id, userId, productId, quantity) 
          VALUES($1, $2, $3, $4)
          RETURNING *;
        `, [id, userId, productId, quantity]);
    
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
            SELECT "userId"
            FROM orders
            WHERE "userId"=${id}
            RETURNING *;
        `);
            
            return order;
            }catch(error){
            throw error
            }
        }

async function addProductToOrder({id}){
    try {
        const { rows: [ order ] } = await client.query(`
            INSERT INTO orders(id)
            VALUES($1)
            WHERE id=${id}
            RETURNING *;
        `, [id]);
                
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