select managed_team_id from team_permission where team_id = 
(select team_id from employee where id = 
(select employee_id from local_session where id = $1))
and array[5, 6] <@ (permission_ids);

/*permissions_id*/