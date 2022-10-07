const express = require("express");
const loginRouter = express.Router();
const {authUser, test} = require('../controllers/user');



loginRouter.route('/').post(authUser);



module.exports = {loginRouter};
