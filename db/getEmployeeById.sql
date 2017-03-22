select team_id, first_name, last_name, username, email, role, reports_to_id
from employee
where id = $1;