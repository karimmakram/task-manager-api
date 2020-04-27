const User = require('../model/User')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
   try {
    const token = req.header('Authorization').replace('Bearer ','')
    const data = jwt.verify(token,process.env.secret_token)
    const user = await User.findOne({_id:data._id,'tokens.token':token})

    if(!user){
        throw new Error
    }

    req.token = token
    req.user = user
    next()
    
   } catch (error) {
       res.send({error:'please Authentecation'})
   }
}

module.exports = auth