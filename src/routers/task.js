const express = require('express')
const Task = require('../model/Tasks')
const auth = require('../middlewere/auth')
const router = express.Router()
// 

///    Task   //////////////

//Add task
router.post('/task',auth,async (req,res)=>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }

   
})


//get all tasks
router.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}
    const limit = parseInt(req.query.limit) || 2 
    const skip  = parseInt(req.query.skip) || 0
    var sortBy  = 1 
    if(req.query.sortBy){
        sort.completed = 1
        sort.createdAt = req.query.sortBy.toLowerCase() === 'desc' ?-1 : 1
        
    }
    try {
        if(req.query.completed){
            match.completed  = req.query.completed 
            // tasks = await Task.find({owner:req.user._id,completed})
        }
        // tasks = await Task.find({owner:req.user._id},{options:{limit:2}})
        
        await req.user.populate({path:'tasks',
        match,
        options:{
            limit,
            skip,
            sort
        }}).execPopulate()
         
        res.status(201).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error.message)
    }
   
    
})


//get task by id
router.get('/tasks/:id',auth,async (req,res)=>{
    const id = req.params.id
    try {
        // const task = await Task.findById(id)
        const task = await Task.findOne({_id:id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//update task by id 

router.patch('/tasks/:id',auth,async (req,res)=>{

    const id = req.params.id
    const objectKeys = Object.keys(req.body)
    const allowedUpdate = ['description','completed']
    const validOperation = objectKeys.every((key)=> allowedUpdate.includes(key))

    if(!validOperation){
        return res.status(400).send("Invalid key update")
    }

    try {
        // to run pre processing
        
        const task = await Task.findOne({_id:id,owner:req.user._id})


        // const task = await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
        
        if(!task){
            return res.status(400).send("not task exit to update")
        }
        
        if(task.completed){
            return res.send("This task "+task.description+" is completed you can create one else")
        }
        objectKeys.forEach((key)=>{
            task[key] = req.body[key]
        }) 
        await task.save()

        res.status(201).send(task)

    } catch (error) {
        res.status(400).send(error.message)
    }
    
})


//Delete Task 

router.delete('/tasks/:id',auth,async (req,res)=>{
    const id = req.params.id 
    
    try {
        const task = await Task.findOneAndDelete({_id:id,owner:req.user._id})
        if(!task){
            return res.status(400).send("task not found")
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


module.exports = router
