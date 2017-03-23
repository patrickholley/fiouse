select * from team_permission where team_id = 
(select team_id from employee where id = 
(select employee_id from local_session where id = $1));