const mongoose=require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const taskSchema = mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:objectId,
        required:true,
        ref: 'users'
    }
},{
   timestamps:true 
})


const tasks = mongoose.model('tasks',taskSchema)

module.exports = tasks