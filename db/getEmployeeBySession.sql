select * from employee where id =
(select employee_id from local_session where id = $1);