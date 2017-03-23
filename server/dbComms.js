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
    getEditTeamList: (req, res) => {
        db.getEditTeamList ([config.decrypt(req.params.session_id)], (err, teams) => {
            if (err) res.status(500).send(err)
            else res.status(200).send(teams)
        })
    },
    getProfile: (req, res) => {
        db.getEmployeeById ([config.decrypt(req.params.session_id)], (err, profile) => {
            if (err) res.status(500).send(err)
            else if (!profile[0]) res.status(403).send('Invalid session.')
            else res.status(200).send(profile[0])
        })
    },
    getSession: (req, res) => {
        db.getSession([config.decrypt(req.params.id)], (err, session) => {
            if (err) res.status(500).send(err)
            else res.status(200).send(session[0])
        })
    },
    getTeams: (req, res) => {
        db.getTeams([config.decrypt(req.params.session_id)], (err, teams) => {
            if (err) res.status(500).send(err)
            else res.status(200).send(teams)
        })
    },
    login: (req, res) => {
        db.getEmployeeByName([req.body.username], (err, employee) => {
            if (err) res.status(500).send(err)
            else if (!employee[0] || config.decrypt(employee[0].password) != req.body.password) res.status(403).send('The credentials entered are incorrect. Please try again.')
            else db.deleteSessionByEmployee([employee[0].id], (err) => {
                if (err) res.status(500).send(err)
                else db.createSession([employee[0].id], (err) => {
                    if (err) res.status(500).send(err)
                    else db.getSession([employee[0].id], (err, session) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).json(config.encrypt(session[0].id.toString()))
                    })
                })
            })
        })
    },
    logout: (req, res) => {
        db.deleteSessionById([config.decrypt(req.body.session_id)], (err) => {
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