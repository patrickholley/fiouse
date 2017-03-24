select id, first_name, last_name, company_id from employee where company_id = 
(select id from company where id =
(select company_id from employee where id =
(select employee_id from local_session where id = $1)));