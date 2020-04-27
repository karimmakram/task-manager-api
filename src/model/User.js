const mongoose=require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./Tasks')
const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invaild Email")
            }
        }
    },Age:{
        type:Number,
        default:0,
        validate(v){
            if(v<0){
                throw new Error("Age can't be negitive")
            }
        }
    },password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.includes("password")){
                throw new Error ("password can't be include \"password\" ")
            }
        }
    },tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    image:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'owner'
})


userSchema.methods.toJSON = function(){
    const user = this 
    const  publicUserData = user.toObject()
    delete publicUserData.tokens
    delete publicUserData.password
    delete publicUserData.image

    
    return publicUserData
}


userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},process.env.secret_token)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.Login = async (email , password)=>{
    const user =await User.findOne({email})

    if(!user){
        console.log(1);
        
        throw new Error ('Unable to login') 
    }

    isMatch =await bcrypt.compare(password,user.password)
    if(!isMatch){
        console.log(2);
        throw new Error('Unable to login') 
    }
    return user 
}

// Hash password
userSchema.pre("save",async function(next){

    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,6)     
    }
    next()

})

userSchema.pre("remove",async function(next){
    const user = this 
    await Task.deleteMany({owner:user._id})
    next()

})
const User = mongoose.model('users',userSchema)

module.exports = User