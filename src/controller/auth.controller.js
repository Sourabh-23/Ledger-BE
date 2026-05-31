const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')





// api/auth/register
async function userRegisterController(req,res){
    const {email,name,password} = req.body || {}

    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const isEmailExist = await userModel.findOne({email})

    if(isEmailExist){
        return res.status(400).json({message:"Email already exists"})
    }

    const user = await userModel.create({email,name,password})
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)

    res.status(201).json({
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

// user login controller
async function userLoginController(req,res)
{
    const {email,password} = req.body || {}

    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})
    }

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(400).json({message:"Invalid password"})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)

    res.status(200).json({
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })





}

function userLogoutController(req,res){
    res.clearCookie("token")
    res.status(200).json({message:"Logged out successfully"})
}

module.exports = {userRegisterController, userLoginController, userLogoutController} 
