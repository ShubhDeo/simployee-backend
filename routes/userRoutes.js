const express = require("express");
const userRouter = express.Router();
const {getUser, addUser, updateUser, deactivateUser, getAllUser} = require('../controllers/user');
const {protect, isAdmin} = require('../middlewares/authMiddleware')

userRouter.route('/').get(protect,isAdmin,getAllUser);
userRouter.route('/:id').get(getUser).put(protect,updateUser);
userRouter.route('/add').post(protect, isAdmin, addUser);
userRouter.route('/deactivate/:id').put(protect, isAdmin, deactivateUser);




module.exports = {userRouter};
