const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const config = require('./config')
const massive = require('massive')
const cors = require('cors')
const app = module.exports = express()
app.use(cors())
const conn = massive.connectSync({
  connectionString : config.eleSql
});
app.set('db', conn);
const db = app.get('db');
app.use(express.static('./dist'))

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
const port = config.port

app.post('/api/contact', (req, res) => {
    transporter.sendMail({
        from: config.email,
        to: 'patrick_holley@outlook.com',
        subject: 'New Fiouse Lead',
        html: `<div style="border:5px solid rgb(120, 155, 125); border-radius:25px; width:500px; padding:25px">
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

app.post('/api/login', dbComms.login)
app.delete('/api/logout', dbComms.logout)
app.put('/api/reset', dbComms.reset)
app.get('/api/session/:id', dbComms.getSession)
app.get('/api/employee/:session_id', dbComms.getReportsToList)
app.post('/api/employee', dbComms.createEmployee)
app.put('/api/employee', dbComms.updateEmployee)
app.delete('/api/employee', dbComms.deleteEmployee)
app.get('/api/team/:session_id', dbComms.getTeams)
app.get('/api/edit-team/:session_id', dbComms.getEditTeamList)
app.get('/api/view-employee/:session_id', dbComms.getViewEmployeeList)

//for testing purposes
app.put('/encrypt', (req, res) => {
    res.status(200).send(config.encrypt(req.body.string))
})
app.put('/decrypt', (req, res) => {
    res.status(200).send(config.decrypt(req.body.string))
})

app.listen(port, () => console.log(`Listening on port ${port} . . .`))