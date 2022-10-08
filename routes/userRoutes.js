const express = require("express");
const userRouter = express.Router();
const {getUser} = require('../controllers/user');



userRouter.route('/:id').get(getUser);



module.exports = {userRouter};
