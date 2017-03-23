select * from team where id =
(select managed_team_id from team_permission where team_id = $1
and array[5, 6] <@ (permission_ids));