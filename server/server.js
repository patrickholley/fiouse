const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const config = require('./config')
const massive = require('massive')
const app = module.exports = express()
const conn = massive.connectSync({
  connectionString : config.eleSql
});
app.set('db', conn);
const db = app.get('db');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email,
        pass: config.epass
    }
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbComms = require('./dbComms')
const port = 3000

app.post('/contact', (req, res) => {
    transporter.sendMail({
        from: config.email,
        to: 'patrick_holley@outlook.com',
        subject: 'New Fiouse Lead',
        html: `<div style="border:5px solid #169b62; border-radius:25px; width:500px; padding:25px">
        Hello,<br><br>
        You have a new lead waiting for you. Please respond as soon as possible.<br><br>
        <div style="margin-left:25px;">Company: ${req.body.company}<br>
        Point of Contact: ${req.body.name}<br>
        Phone: ${req.body.phone}<br>
        Email: ${req.body.email}<br></div><br>
        Thank you,<br>
        Fiouse Training Solutions</div>`,
        text: `${req.body.company}\n${req.body.name}\n${req.body.phone}\n${req.body.email}`
    })
    res.status(200).json(`Email sent.`)
})

app.post('/login', dbComms.login)
app.delete('/logout', dbComms.logout)
app.get('/profile/:session_id', dbComms.getProfile)
app.put('/reset', dbComms.reset)
app.get('/session/:id', dbComms.getSession)

//for testing purposes
app.put('/encrypt', (req, res) => {
    res.status(200).send(config.encrypt(req.body.string))
})
app.put('/decrypt', (req, res) => {
    res.status(200).send(config.decrypt(req.body.string))
})

app.listen(port, () => console.log(`Listening on port ${port} . . .`))