import express,{Router,Request,Response} from "express"
import User from "../MODELs/users"
import bcrypt from "bcryptjs"
const router = Router()

//login
router.post('/users/login',async (req:Request,res:Response)=>{
    try{
        const  {email,password}:{email:string,password:string}=req.body
        const userlogin =await User.findOne({email})
        if(!userlogin){
            throw new Error ('Unable to login') 
        }

        const isMatch:boolean =await bcrypt.compare(password,userlogin.password)
        if(!isMatch){
            console.log(2);
            throw new Error('Unable to login') 
        }
        const token = await userlogin.generateAuthToken()
        console.log(token);
        
        res.send({userlogin,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }

})


export default router