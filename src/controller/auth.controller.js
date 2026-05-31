const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')





// api/auth/register
function userRegisterController(req,res){
    const {email,name,password} = req.body

    if(!email || !name || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    if(isEmailExist(email)){
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

module.exports = {userRegisterController} 