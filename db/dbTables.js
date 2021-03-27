const client = require('./client.js');



async function dropTables() {
    try {
      console.log('Dropping All Tables...');
      // drop all tables, in the correct order
      await client.query(`
      DROP TABLE IF EXISTS order;
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
          address varchar(255),
          admin BOOLEAN DEFAULT false
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name varchar(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          category varchar(255) NOT NULL,
          photos [varbinary](max) NOT NULL,
          price INTEGER NOT NULL
        );
  
        CREATE TABLE order (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERANCES products(id),
          quantity INTEGER NOT NULL
        );

      `);
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }


  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();

    } catch (error) {
      console.log('Error during rebuildDB')
      throw error;
    }
  }
  
  module.exports = {
    rebuildDB
  };