const express = require('express')
require('./db/mongoose')
const routerUser = require('./routers/user')
const routerTask = require('./routers/task')

const app =express()
const port = process.env.PORT

app.use(express.json())
app.use(routerUser)
app.use(routerTask)
// run express 
app.listen(port,()=>{
    console.log("server is up on port ",port);
    
})







// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.endsWith('.pdf')){
//             cb(new Error('file must be PDF'))
//         }
//         cb(undefined,true)
//     }
// })


// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// })

//  Relation between task , user
// const Task = require('./model/Tasks')
// const User = require('./model/User')
// const next  = async ()=>{
    // task = await Task.findById("5e9c025c9395f1045cb3a11d")
    // await task.populate('owner').execPopulate()
    // console.log(task.owner.name);
    
//     user = await User.findById("5e9c02579395f1045cb3a11b")
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks);
// }
// next()




// token

// const jsw = require('jsonwebtoken')
// const fn = ()=>{
// const token = jsw.sign({_id:"karim"},"thisismytoken")
// console.log(token);

// const data = jsw.verify(token,"thisismytoken") 
// console.log(data);

// }

// fn()

//EncodePassword


// const bcrypt = require('bcryptjs')

// const fn = async ()=>{
//     const password ="karim123"
//     const hash = await bcrypt.hash(password,6)
//     const hash2 = await bcrypt.hash(password,6)
//     console.log(hash);  
//     console.log(hash2);  
//     console.log(await bcrypt.compare(password,hash))
//     console.log(await bcrypt.compare("karim123",hash)) 
// }
// fn()


/// last promise like 

    //Fine all tasks

    //  Task.find().then((result)=>{
    //      res.status(200).send(result)
    //  }).catch((error)=>{
    //     res.status(400).send({error:error.message})
    //  })


    //Add task 

    // const task = new Task(req.body)    
    // task.save().then((result)=>{
    //     res.status(201)
    //     res.send(result)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send({Error:error.message})
    // })

    //Find one user

    //    User.findById(id).then((result)=>{
    //        if(!result){
    //            return res.status(404).send()
    //        }
    //        res.status(200).send(result)
    //    }).catch((error)=>{
    //       res.status(500).send("")
    //    })

    //Add user

    // user.save().then((user)=>{
    //     res.status(201)
    //     res.send(user)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send({Error:error.message})
    // })