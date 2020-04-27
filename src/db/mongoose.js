const mongoose=require('mongoose')


mongoose.connect(process.env.Mongoose_URL,
{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})





// tasks.find().then((r)=>{console.log(r);
// })

// task.save().then((result)=>{
//     console.log(result);
    
// }).catch((error)=>{
//     console.log("Error!",error.message);
    
// })



// examble

// const users = mongoose.model('users',{
//     name :{
//         type:String,
//         required:true,
//         trim:true,
//         maxlength:50
//     },Email:{
//         type:String,
//         required:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error("invaild Email")
//             }
//         }
//     },Age:{
//         type:Number,
//         default:0,
//         validate(v){
//             if(v<0){
//                 throw new Error("Age can't be negitive")
//             }
//         }
//     },password:{
//         type:String,
//         required:true,
//         trim:true,
//         minlength:7,
//         validate(value){
//             if(value.includes("password")){
//                 throw new Error ("password can't be include \"password\" ")
//             }
//         }
//     }
// })

// const user = new users({
//     name:"  karim ",
//     Email:"karim@a.com",
//     Age:22,
//     password:"karim123password"
// })