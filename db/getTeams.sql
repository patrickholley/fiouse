select * from team where company_id =
(select company_id from employee where id =
(select employee_id from local_session where id = $1));