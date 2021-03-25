const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { 
    createUser,
    getUserByUsername,
    getUser
} = require('../db/index');
const { requireUser } = require('./utils');


usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");     
    next();
})

usersRouter.post('/register', async (req, res, next) => {

    const _user = await getUserByUsername(req.body); // username
    try{
        if(_user){
            next();
        }else {
        const user =  await createUser(req.body);  // username, password         
        res.send({user})
        }
        
    }catch (error){
        next (error);
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const user = await getUser(req.body) //username
    try {
        
        if (user) {     
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET );
            res.send({ token: token});
          }
    } catch (error) {
        next (error)
    }
})

usersRouter.get('/me', requireUser, async (req, res, next) => {

    try {        
        res.send(req.user)
    } catch (error) {
        console.log(error)
        next(error);
    }
   
})

usersRouter.get('/:username/orders', requireUser, async (req, res, next) => {

    try {
        const userOrders = await getUserPastOrders(req.body); // userId
        res.send(userOrders)
    } catch ({name, message}) {
        next({
            name: "getUserPastOrdersError",
            message: "There was an error getting User Orders"
        })
    }
})

module.exports = usersRouter;