select * from team where id =
(select managed_team_id from team_permission where team_id = $1
and array[5, 6] <@ (permission_ids))
or (name = '_Base' and company_id = 
(select company_id from team_permission where team_id = $1));