import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }],
    Age:{
        type:Number,
        default:20
    },
    image:{
        type:Buffer
    }
},{timestamps:true})

userSchema.methods.toJSON =function(){
    const user = this
    const userData = user.toObject()
    delete userData.tokens
    delete userData.image
    delete userData.password
    return userData
}
userSchema.methods.generateAuthToken = async function(){
    const user = this 
    const token = jwt.sign({_id:user._id.toString()},"myToken")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


 interface UserInterface extends mongoose.Document {
    name: string
    email: string
    password: string
    Age: Number
    image:Buffer
    tokens:String[]
    generateAuthToken():Function
  }
const User = mongoose.model<UserInterface>('users',userSchema)
export default User
