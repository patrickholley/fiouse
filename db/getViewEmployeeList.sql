select * from employee where team_id in
(select id from team where id =
(select managed_team_id from team_permission where team_id = $1
and array[1] <@ (permission_ids))
or (name = '_Base' and company_id = 
(select company_id from team_permission where team_id = $1)));