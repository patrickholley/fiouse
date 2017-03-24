select employee.*, team.name from employee inner join team on employee.team_id = team.id where employee.team_id in
(select managed_team_id from team_permission where team_id = $1
and array[1] <@ (permission_ids))
or (name = '_Base' and employee.company_id = 
(select company_id from team_permission where team_id = $1));