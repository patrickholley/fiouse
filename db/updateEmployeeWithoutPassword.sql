update employee
set first_name = $1,
last_name = $2,
email = $4,
role = $5,
team_id = $6,
reports_to_id = $7,
company_id = (select company_id from team where id = $6)
where id = $3;