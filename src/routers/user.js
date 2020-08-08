const express = require('express')
const User = require('../model/User')
const auth = require('../middlewere/auth')
const router = express.Router()
const multer = require('multer')
const sharp =require('sharp')
const {sendWelcomeEmail,sendCancledEmail} = require('../emails/account')

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(PNG|jpg|jpeg)$/)){
            return cb(new Error('you must upload image'))
        }
        cb(undefined,true)
    }
})



////       USER /////////////

//Add user
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        token =await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send(error.message)
    }
    
})

//get All user
//get userProfile
router.get('/users/me',auth,async (req,res)=>{
    // try {
    //     const users = await User.find()
    //     res.status(201).send(users)   
    // } catch (error) {
    //     res.status(500).send(error.message)
    // }

    res.send(req.user)
   
})


//get user by id
// router.get('/users/:id',auth,async (req,res)=>{
//    const id = req.params.id
//    try {
//        const user = await User.findById(id)
//               if(!user){
//            return res.status(404).send()
//        }
//        res.status(201).send(user)
//    } catch (error) {
//        res.status(500).send(error.message)
//    }

// })


// update User by id 
//update user auth
router.patch('/users/me',auth, async (req,res)=>{
    // const id = req.user._id 
    const keysOfObject = Object.keys(req.body)
    const allowed = ['name','password','Age']
    const validOperation = keysOfObject.every((key)=> allowed.includes(key))
    
    if(!validOperation){
        return res.status(400).send("Invalid update key")
    }

    try {
        // to run pre processing 
        // const user = await User.findById(id)
        const user = req.user
        keysOfObject.forEach(key => {
            user[key] = req.body[key]
        });
        await user.save() 
        // const user = await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


//Delete User

router.delete('/users/me',auth,async (req,res)=>{
    // const id = req.user._id
    
    try {
        // const user = await User.findByIdAndDelete(id)
        // if(!user){
        //     return res.status(400).send("user not found")
        // }
        await req.user.remove()
        sendCancledEmail(req.user.email,req.user.name)
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


//user Login 

router.post('/users/login',async (req,res)=>{
    try{
    const user =await User.Login(req.body.email,req.body.password)
    const token =await user.generateAuthToken()
    res.send({user,token})
    }catch(e){
        res.status(400).send(e.message)
    }

})

// user logout 

router.post('/users/logout',auth, async (req,res)=>{
    try {
        req.user.tokens =req.user.tokens.filter((token)=>token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(400).send()
    }
})

//user logout all 

router.post('/users/logoutAll',auth, async (req,res)=>{
    try {
        req.user.tokens =[]
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(400).send()
    }
})


//upload images or file 

router.post('/users/me/avatar',auth,upload.single('avater'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).png().resize(250,250).toBuffer()
    req.user.image = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{   
    res.status(400).send({error:error.message})
})

//Delete image 

router.delete('/users/me/avatar',auth,async (req,res)=>{
    try {
        req.user.image = undefined
        await req.user.save()
        res.send()    
    } catch (error) {
        res.status(500).send(error.message)
    }
    
})

//get user image by id 

router.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.image){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.image)
        
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router
