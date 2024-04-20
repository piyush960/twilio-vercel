const express = require('express')
const twilio = require('twilio')
require('dotenv').config()
const app = express()
const cors = require('cors');

const PORT = process.env.PORT
app.use(cors())
app.use(express.json())


function sendSMS(phone, message){
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    
    return client.messages.create({
        body: message,
        from: process.env.PHONE_NUMBER,
        to: phone,
    })
    .then(message => {
        console.log(message, "message sent")
    })
    .catch(e => console.log(e))
}

app.get('/', (req, res) => {
    res.status(200).send('hello world!')
})

app.post('/sendsms', (req, res) => {
    phone = req.body.phone
    message = req.body.message

    try{
        sendSMS(phone, message);
        console.log(phone)
        res.status(200).json({success: true})
    }
    catch(e){
        console.log(e)
        res.status(500).send({success: false})
    }
})

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))