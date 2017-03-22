select team_id, first_name, last_name, username, email, role, reports_to_id
from employee where id =
(select employee_id from local_session where id = $1);