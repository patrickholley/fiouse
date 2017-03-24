const app = require('./server')
const db = app.get('db')
const config = require('./config')

module.exports = {
    createEmployee: (req, res) => {
        db.getEmployeeBySession([config.decrypt(req.body.session_id)], (err, user) => {
            if (err) res.status(500).send(err)
            else if (!user[0] || config.decrypt(user[0].password) != req.body.session_password) {
                res.status(403).json(`Invalid credentials. Please re-enter your password. If that does not work, log out and back in, then attempt again. If the issue continues to persist, contact your admin.`)
            }
            else db.createEmployee(
                [req.body.first_name,
                req.body.last_name,
                req.body.username,
                config.encrypt(req.body.password),
                req.body.email,
                req.body.role,
                req.body.team_id,
                req.body.reports_to_id], (err) => {
                if (err) res.status(500).send(err)
                else res.status(200).json('Successfully added.')
            })
        })
    },
    deleteEmployee: (req, res) => {
        db.getEmployeeBySession([config.decrypt(req.body.session_id)], (err, user) => {
            if (err) res.status(500).send(err)
            else if (!user[0] || config.decrypt(user[0].password) != req.body.session_password) {
                res.status(403).json(`Invalid credentials. Please re-enter your password. If that does not work, log out and back in, then attempt again. If the issue continues to persist, contact your admin.`)
            }
            else db.getTeamPermissionBySession ([config.decrypt(req.body.session_id)], (err, t_permissions) => {
                if (err) res.status(500).send(err)
                else if (!t_permissions[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                else {
                    if (t_permissions[0].fiouse) {
                        db.deleteEmployee ([req.body.id], (err) => {
                            if (err) res.status(500).send(err)
                            else res.status(200).json('Delete successful.')
                        })
                    }
                    else if (t_permissions[0].admin) {
                        db.deleteEmployee ([req.body.id], (err) => {
                            if (err) res.status(500).send(err)
                            else res.status(200).json('Delete successful.')
                        })
                    }
                    else if (t_permissions[0].base) {
                        res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                    }
                    else db.getDeleteEmployee ([t_permissions[0].team_id, req.body.id], (err, employee) => {
                        if (err) res.status(500).send(err)
                        else if (!employee[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                        else db.deleteEmployee([employee[0].id], (err) => {
                            res.status(200).json('Delete successful.')
                        })
                    })
                }
            })
        })
    },
    getEditTeamList: (req, res) => {
        db.getTeamPermissionBySession ([config.decrypt(req.params.session_id)], (err, t_permissions) => {
            if (err) res.status(500).send(err)
            else if (!t_permissions[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
            else {
                if (t_permissions[0].fiouse) {
                    db.getFiouseTeamList ((err, teams) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(teams)
                    })
                }
                else if (t_permissions[0].admin) {
                    db.getAdminTeamList ([t_permissions[0].company_id], (err, teams) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(teams)
                    })
                }
                else if (t_permissions[0].base) {
                    res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                }
                else db.getEditTeamList ([t_permissions[0].team_id], (err, teams) => {
                    if (err) res.status(500).send(err)
                    else if (!teams[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                    else res.status(200).send(teams)
                })
            }
        })
    },
    getViewEmployeeList: (req, res) => {
        db.getTeamPermissionBySession ([config.decrypt(req.params.session_id)], (err, t_permissions) => {
            if (err) res.status(500).send(err)
            else if (!t_permissions[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
            else {
                if (t_permissions[0].fiouse) {
                    db.getFiouseEmployeeList ((err, employees) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(employees)
                    })
                }
                else if (t_permissions[0].admin) {
                    db.getAdminEmployeeList ([t_permissions[0].company_id], (err, employees) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(employees)
                    })
                }
                else if (t_permissions[0].base) {
                    res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                }
                else db.getViewEmployeeList ([t_permissions[0].team_id], (err, employees) => {
                    if (err) res.status(500).send(err)
                    else if (!employees[0]) res.status(403).send('You have insufficient privileges to make changes here. Please contact your admin.')
                    else res.status(200).send(employees)
                })
            }
        })
    },
    getReportsToList: (req, res) => {
        db.getTeamPermissionBySession ([config.decrypt(req.params.session_id)], (err, t_permissions) => {
            if (err) res.status(500).send(err)
            else {
                if (t_permissions[0].fiouse) {
                    db.getFiouseEmployeeList ((err, employees) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(employees)
                    })
                }
                else {
                    db.getReportsToList([config.decrypt(req.params.session_id)], (err, employees) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).send(employees)
                    })
                }
            }
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
    },
    updateEmployee: (req, res) => {
        db.getEmployeeBySession([config.decrypt(req.body.session_id)], (err, user) => {
            if (err) res.status(500).send(err)
            else if (!user[0] || config.decrypt(user[0].password) != req.body.session_password) {
                res.status(403).json(`Invalid credentials. Please re-enter your password. If that does not work, log out and back in, then attempt again. If the issue continues to persist, contact your admin.`)
            }
            else {
                if (req.body.password != '') {
                    db.updateEmployeeWithPassword(
                            [req.body.first_name,
                            req.body.last_name,
                            req.body.id,
                            config.encrypt(req.body.password),
                            req.body.email,
                            req.body.role,
                            req.body.team_id,
                            req.body.reports_to_id], (err) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).json('Successfully updated.')
                    })
                }
                else {
                    db.updateEmployeeWithoutPassword(
                            [req.body.first_name,
                            req.body.last_name,
                            req.body.id,
                            req.body.email,
                            req.body.role,
                            req.body.team_id,
                            req.body.reports_to_id], (err) => {
                        if (err) res.status(500).send(err)
                        else res.status(200).json('Successfully updated.')
                    })
                }
            }
        })
    }
}