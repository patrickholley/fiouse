insert into employee
(company_id, team_id, first_name, last_name, username, password, email, role, reports_to_id)
values
((select company_id from team where id = $7), $7, $1, $2, $3, $4, $5, $6, $8);