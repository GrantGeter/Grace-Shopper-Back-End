const client = require('./client');
const { createProduct } = require('./products');
const { createUser } = require('./user');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.log(error)
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    // create all tables, in the correct order
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          email varchar(255) UNIQUE NOT NULL,
          password varchar(255) UNIQUE NOT NULL,
          name varchar(255) NOT NULL,
          admin BOOLEAN DEFAULT false
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          category varchar(255) NOT NULL,
          photos varchar(255) NOT NULL,
          price INTEGER NOT NULL
        );
  
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER NOT NULL,
          active BOOLEAN DEFAULT true
        );
      `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

const createInitialUsers = async () => {
  try {
    const usersToCreate = [
      { username: 'Grant', email: 'grantgeter@gmail.com', password: 'password', name: 'Grant Geter', admin: true },
      { username: 'Bobby', email: 'bobsmith@gmail.com', password: 'password', name: 'Bob smith', admin: false },
    ]
    const users = await Promise.all(usersToCreate.map(createUser));
  } catch (error) {
    throw error
  }
}

const createInitialProducts = async () => {
  try {
    const productsToCreate = [
      {
        "name": "Red Shirt",
        "description": "The finest quality shirt",
        "category": "shirts",
        "photos": "https://i.imgur.com/YG80f8X.jpg",
        "price": 12
      },
      {
        "name": "Green Shirt",
        "description": "The finest quality shirt",
        "category": "shirts",
        "photos": "https://i.imgur.com/UzjgCrF.jpg",
        "price": 12
      },
      {
        "name": "Blue Shirt",
        "description": "The finest quality shirt",
        "category": "shirts",
        "photos": "https://i.imgur.com/L0UpT6S.jpg",
        "price": 12
      },
      {
        "name": "Purple Shirt",
        "description": "The finest quality shirt",
        "category": "shirts",
        "photos": "https://i.imgur.com/QpLryoI.jpg",
        "price": 12
      },
      {
        "name": "Teal Shirt",
        "description": "The finest quality shirt",
        "category": "shirts",
        "photos": "https://i.imgur.com/Ij6xP2g.jpg",
        "price": 12
      }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();

  } catch (error) {
    console.log('Error during rebuildDB')
    throw error;
  }
}

module.exports = {
  rebuildDB
};