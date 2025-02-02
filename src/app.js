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

module.exports =app