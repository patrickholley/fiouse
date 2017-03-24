update employee
set first_name = $1,
last_name = $2,
password = $4,
email = $6,
role = $5,
team_id = $7,
reports_to_id = $8,
company_id = (select company_id from team where id = $7)
where id = $3;