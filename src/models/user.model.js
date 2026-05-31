const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        unique:[true,"Email already exists"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    }.required,
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false
    },
    timestamps:true       
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})
    
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
}

const userModel = mongoose.model('User',userSchema)

module.exports = userModel