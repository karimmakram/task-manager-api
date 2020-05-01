const mongoose=require('mongoose')


mongoose.connect(process.env.Mongoose_URL,
{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})





