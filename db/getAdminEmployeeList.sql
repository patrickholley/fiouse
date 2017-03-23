select * from employee where company_id = $1 and team_id !=
(select id from team where name = '_Admin' and company_id = $1);