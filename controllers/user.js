const User = require("../models/User")
const generateToken = require("../utils/generateToken")
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')


// @desc Auth the user & get the token
// @route POST /api/login
// @access Public route
const authUser =  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if(!user && !user.isActivated) {
        res.status(401).send("Invalid credentials");
    }
    
    const isValid = bcrypt.compareSync(password, user.password);
    

    if(isValid) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            contact: user.contact,
            joiningDate: user.joiningDate,
            department: user.department,
            isAdmin: user.isAdmin,
            isActivated: user.isActivated,
            tasks: user.tasks,
            token: generateToken(user._id)
        });
    }else {
        res.status(401).send("Invalid password"); 
    }

})


const test = asyncHandler( async (req, res) => {
    res.send("Get req /api/login")
})


module.exports = {authUser, test};