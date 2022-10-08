const express = require("express");
const loginRouter = express.Router();
const {authUser} = require('../controllers/user');



loginRouter.route('/').post(authUser);



module.exports = {loginRouter};
