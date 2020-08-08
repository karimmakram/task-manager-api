console.log("111");

import express from "express"
import './db/mongoose'
import routerUser from "./Routers/user"

const app =express()
const port = 3000

app.use(express.json())
app.use(routerUser)


app.listen(port,()=>{
    console.log("server is up on port ",port);
    
})