const client = require('./client');
const bcrypt = require('bcrypt');

const createUser = async ({ username, email, name, password, admin }) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, email, name, password, admin)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [username, email, name, hashedPassword, admin]);

        if (user) {
            delete user.password;
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE id=$1;
       `, [id]);
        if (user) {
            delete user.password;
        }
        return user;
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async ({ username }) => {

    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE username=$1;
       `, [username]);
        if (user) {
            delete user.password;
        }
        return user;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    // need funcction for login
};
