const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const {
    createUser,
    getUserByUsername,
    getUserById,
    editProfile,
    getUser
} = require('../db/index');
const { requireUser } = require('./utils');


userRouter.use((req, res, next) => {
    console.log("A request is being made to /user");
    next();
})

userRouter.post('/register', async (req, res, next) => {

    const _user = await getUserByUsername(req.body); // username
    try {
        if (_user) {
            next();
        } else {
            const user = await createUser(req.body);  // username, password 
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);

            res.send({ user, token })
        }

    } catch ({ name, message }) {
        next({
            name: "createUSerError",
            message
        })
    }
});

userRouter.post('/login', async (req, res, next) => {

    try {
        const user = await getUser(req.body) //username, password
        console.log(user);
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
            res.send({ user, token });
        }
    } catch (error) {
        next(error)
    }
})

userRouter.post('/:username/edit', requireUser, async (req, res, next) => {
    
    try {
        const user = await editProfile(req.user, req.body); // id, username, email, password, name
        res.send(user)
    } catch ({ name, message }) {
        next({
            name,
            message
        })
    }
})

userRouter.get('/me', requireUser, async (req, res, next) => {

    try {
        res.send(req.user)
    } catch (error) {
        console.log(error)
        next(error);
    }

})

// userRouter.get('/:username/orders', requireUser, async (req, res, next) => {

//     try {
//         const userOrders = await getUserPastOrders(req.body); // userId
//         res.send(userOrders)
//     } catch ({ name, message }) {
//         next({
//             name: "getUserPastOrdersError",
//             message: "There was an error getting User Orders"
//         })
//     }
// })

module.exports = userRouter;