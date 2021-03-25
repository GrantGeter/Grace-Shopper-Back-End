// Users table
// id SERIAL PRIMARY KEY
// username VARCHAR(255) UNIQUE NOT NULL
// password VARCHAR(255) NOT NULL
// "firstName" TEXT NOT NULL
// "lastName" TEXT NOT NULL
// address TEXT NOT NULL
// telephone TEXT NOT NULL
// email VARCHAR(255)	UNIQUE NOT NULL
// maybe have a friends list to see what friends have bought, or buy in bulk with friends for a discount


//Product tabble
// id SERIAL PRIMARY KEY
// "productName" VARCHAR(255) UNIQUE NOT NULL
// "productType" VARCHAR(255) NOT NULL
// description VARCHAR(255) NOT NULL
// stock INT
// price INT
// img VARCHAR(255) NOT NULL

// Cart table
// id SERIAL PRIMARY KEY
// "userId" INTEGER REFERENCES users(id)
// "productId" INTEGER REFERENCES product(id)
// quantity INT   


