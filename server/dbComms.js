const app = require('./server')
const db = app.get('db')
const config = require('./config')

module.exports = {
    login: (req, res) => {
        db.login([req.body.username, req.body.password], (err, user) => {
            if (err) res.status(500).send(err)
            else if (!user[0]) res.status(403).send('The credentials entered are incorrect. Please try again.')
            else res.status(200).send(user[0])
        })
    },
    reset: (req, res) => {
        db.reset((err, company) => {
            if (err) res.status(500).send(err)
            else if (req.body.command != 'RESET') res.status(403).send('The wrong command was entered. Reset aborted.')
            else res.status(200).json('Server reset successfully.')
        })
    }
}