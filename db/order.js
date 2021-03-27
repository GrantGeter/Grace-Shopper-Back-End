

async function createOrder(name, description){
    try {
        const { rows: [ order ] } = await client.query(`
          INSERT INTO orders(name, description) 
          VALUES($1, $2)
          RETURNING *;
        `);
    
        return order;
        }catch(error){
        throw error
        }
    }

    async function getOrderById(id){
        try {
            const { rows: [ order ] } = await client.query(`
              SELECT id
              FROM orders
              WHERE id=${ id }
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
                  FROM order
                  WHERE "userId"=${id}
                  RETURNING *;
                `);
            
                return order;
                }catch(error){
                throw error
                }
            }

    async function addProductToOrder(id){
            try {
                const { rows: [ order ] } = await client.query(`
                    INSERT INTO orders(id)
                    VALUES($1)
                    WHERE id=${id}
                    RETURNING *;
                    `);
                
                    return order;
                    }catch(error){
                    throw error
                    }
                }