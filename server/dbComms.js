const app = require('./server')
const db = app.get('db')
const config = require('./config')

module.exports = {
    createEmployee: (req, res) => {
        db.createEmployee(
            [
                req.body.first_name,
                req.body.last_name,
                req.body.username,
                config.encrypt(req.body.password),
                req.body.email,
                req.body.role
            ], (err) => {
                if (err) res.status(500).send(err)
                else res.status(200).json('Successfully added.')
            })
    },
    getProfile: (req, res) => {
        db.getSession([config.decrypt(req.params.session_id)], (err, session) => {
            if (err) res.status(500).send(err)
            else db.getEmployeeById ([session[0].employee_id], (err, profile) => {
                if (err) res.status(500).send(err)
                else if (!profile[0]) res.status(403).send('Invalid session.')
                else res.status(200).send(profile[0])
            })
        })
    },
    getSession: (req, res) => {
        db.getSession([config.decrypt(req.params.id)], (err, session) => {
            if (err) res.status(500).send(err)
            else res.status(200).send(session[0])
        })
    },
    login: (req, res) => {
        db.getEmployeeByName([req.body.employeename], (err, employee) => {
            if (err) res.status(500).send(err)
            else if (!employee[0] || config.decrypt(employee[0].password) != req.body.password) res.status(403).send('The credentials entered are incorrect. Please try again.')
            else db.createSession([employee[0].id, req.body.fetcher], (err) => {
                if (err) res.status(500).send(err)
                else db.fetchSession([req.body.fetcher], (err, session) => {
                    if (err) res.status(500).send(err)
                    db.removeFetcher([req.body.fetcher], (err) => {
                        res.status(200).json(config.encrypt(session[0].id.toString()))
                    })
                })
            })
        })
    },
    logout: (req, res) => {
        db.deleteSession([config.decrypt(req.body.session_id)], (err) => {
            if (err) res.status(500).send(err)
            else res.status(200).json('Logout successful.')
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