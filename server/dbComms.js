const app = require('./server')
const db = app.get('db')
const config = require('./config')

module.exports = {
    reset: (req, res) => {
        db.reset((err, company) => {
            if (!err && req.body.command == "HARDRESET") res.status(200).send(company)
            else res.status(500).send(err)
        })
    }
}