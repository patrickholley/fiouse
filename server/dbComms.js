const app = require('./server')
const db = app.get('db')
const config = require('./config')

module.exports = {
    login: (req, res) => {
        db.getUser([req.body.username], (err, user) => {
            if (err) res.status(500).send(err)
            else if (!user[0] || config.decrypt(user[0].password) != req.body.password) res.status(403).send('The credentials entered are incorrect. Please try again.')
            else res.status(200).send(user[0])
        })
    },
    reset: (req, res) => {
        db.reset((err, company) => {
            if (err) res.status(500).send(err)
            else if (req.body.command != 'RESET') res.status(403).send('The wrong command was entered. Reset aborted.')
            else res.status(200).json('Server reset successfully.')
        })
    },
    createSession: (req, res) => {
        db.createSession([req.body.id, req.body.fetcher], (err) => {
            if (err) res.status(500).send(err)
            else db.fetchSession([req.body.fetcher], (err, session) => {
                if (err) res.status(500).send(err)
                db.removeFetcher([req.body.fetcher], (err) => {
                    console.log(session[0].id)
                    res.status(200).send(session[0].id.toString())
                })
            })
        })
    }
}