const sendMail = require('@sendgrid/mail')

sendMail.setApiKey(process.env.API_SENDGRID)

const sendWelcomeEmail = (email,name)=>{
 sendMail.send({
        to:email,
        from:'karimomakram11@gmail.com',
        subject:'Welcome to Task Manager',
        text:`welcome ${name} , `
    }).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.message)
        // console.log(error.response.body.errors[0].message)
    })
}

const sendCancledEmail = (email,name)=>{
    sendMail.send({
           to:email,
           from:'karimomakram11@gmail.com',
           subject:'Welcome to Task Manager',
           text:`ازيك يكلب ${name}`
       }).then(() => {
           console.log('Message sent')
       }).catch((error) => {
           console.log(error.message)
           // console.log(error.response.body.errors[0].message)
       })
   }



module.exports = {
    sendWelcomeEmail,
    sendCancledEmail
}