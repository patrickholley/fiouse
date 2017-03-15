const app = require('./server.js')
const db = app.get('db')

module.exports = {
    reset: (req, res) => {
        db.reset((err, table) => {
            if (!err) res.status(200).send('Reset tables')
            else res.status(500).send(err)
        })
    }
}