/*drops all old data*/
drop table if exists team_permission, permission, local_session, employee, team, company;

/*companies, with needed contact info*/
create table company (
    id serial primary key,
    name varchar(255) unique not null,
    address varchar(255) not null,
    url varchar(255) not null,
    phone varchar(255) not null,
    email varchar(255) not null,
    point_of_contact int not null
);

/*teams, with associated company and manager*/
create table team (
    id serial primary key,
    company_id int references company(id) not null,
    name varchar(255) not null
);

/*employees, with ids for which company, team, manager they may have be under*/
create table employee (
    id serial primary key,
    company_id int references company(id) not null,
    team_id int references team(id) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    username varchar(255) unique not null,
    password text not null,
    email varchar(255) not null,
    role varchar(255),
    reports_to_id int
);

/*for locally storing authentication*/
create table local_session (
    id serial primary key,
    employee_id int unique references employee(id)
);

/*available permissions for teams*/
create table permission (
    id serial primary key,
    name varchar(255) not null
);

insert into permission (name)
values ('View User');
insert into permission (name)
values ('Add User');
insert into permission (name)
values ('Edit User');
insert into permission (name)
values ('Delete User');
insert into permission (name)
values ('View Team');
insert into permission (name)
values ('Add Team');
insert into permission (name)
values ('Edit Team');
insert into permission (name)
values ('Delete Team');

/*assign permissions to teams*/
create table team_permission (
    id serial primary key,
    company_id int references company(id) not null,
    team_id int references team(id) not null,
    managed_team_id int,
    permission_ids int[],
    base boolean,
    admin boolean,
    fiouse boolean
);

/*dummy data*/
insert into company (name, address, url, phone, email, point_of_contact)
values ('Fiouse Training Solutions', '1071 S. Kingsbury Road, Springville, UT 84663', 'fiouse.com', '385 399 0297', 'patrick_holley@outlook.com', 1);
insert into team (name, company_id)
values ('_Fiouse Staff', 1);
insert into team_permission (company_id, team_id, fiouse)
values (1, 1, true);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id)
values ('Patrick', 'Holley', 'pholley',
    '551.98.486.31408.756.429.258.60691.993.300.48.38521149.204.53.906.835.6909522.582.802.160.22464398.7.10.963.494.-54107.51.953.962.-60385',
    'pakarrhoy@gmail.com', 'Fiouse CEO', 1, 1);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Shaylee', 'Holley', 'sholley',
    '186.570.672.7286724.681.24.728.629.7886762.210.484.313.5097844.220.327.877.4854611.595.910.281.-1069750.845.967.830.67799.886.97.593.-5916941',
    'mannerofjoy@gmail.com', 'Fiouse COO', 1, 1, 1);

insert into company (name, address, url, phone, email, point_of_contact)
values ('Car Wars', '1977 Millenium Drive, Falcon, TX', 'carwars.com', '722 372 2372', 'cwjsolo@carwars.com', 4);
insert into team (name, company_id)
values ('_Admin', 2);
insert into team (name, company_id)
values ('_Base', 2);
insert into team_permission (company_id, team_id, admin)
values (2, 2, true);
insert into team_permission (company_id, team_id, base)
values (2, 3, true);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id)
values ('Juan', 'Solo', 'cwjsolo',
    '634.908.214.38612.391.147.953.2269035.87.678.539.11421263.696.410.983.92764334.107.120.906.-44976.600.279.704.23275521.138.268.126.526.-17510',
    'cwjsolo@carwars.com', 'General Manager', 2, 2);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Lea', 'Solo', 'cwlsolo',
    '420.118.786.6874.824.404.396.33078252.172.796.731.100.30417613.318.832.854.473.-4964851.132.654.459.17553882.697.739.149.-2664521.46.895.909.7606467',
    'cwlsolo@carwars.com', 'Financial Manager', 2, 3, 3);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Che', 'Bega', 'cwebega',
    '301.183.864.10863208.244.950.954.933.-7055955.457.419.1.1079119.945.913.588.34469852.227.196.319.816.7300485.665.31.705.358.-52155.991.647.9.-6900889',
    'cwebega@carwars.com', 'Head Mechanic', 2, 3, 3);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Landon', 'Christian','cwlchristian',
    '373.702.384.13461241.509.235.641.34.-27051.274.830.488.10469806.78.663.197.91.87591734.110.385.520.4160695.875.912.508.763.121387708.724.146.52.27806522.533.80.745.104.3241655.670.268.225.267.35654811.405.738.629.1856236.365.85.213.2366257.806.45.911.106791015',
    'cwlchristian@carwars.com', 'Mechanic', 2, 3, 5);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Seth', 'Rubio', 'cwsrubio',
    '132.920.675.17490260.670.173.453.-2385496.616.118.956.24371922.455.358.785.890.-3601.798.980.267.106407896.184.674.282.-27274.521.381.478.21963.547.941.476.21746685.631',
    'cwsrubio@carwars.com', 'Mechanic', 2, 3, 5);

insert into company (name, address, url, phone, email, point_of_contact)
values ('Orbal Arts and Crafts', '236 Rolent Way, Zeiss, Germany', 'orbalac.com', '236 236 2362', 'contact@orbalac.com', 9);
insert into team (name, company_id)
values ('Rolent Power', 3);
insert into team (name, company_id)
values ('Rolent', 3);
insert into team (name, company_id)
values ('Bose Power', 3);
insert into team (name, company_id)
values ('Bose', 3);
insert into team (name, company_id)
values ('Ruan Power', 3);
insert into team (name, company_id)
values ('Ruan', 3);
insert into team (name, company_id)
values ('Zeiss Power', 3);
insert into team (name, company_id)
values ('Zeiss', 3);
insert into team (name, company_id)
values ('Grancel Power', 3);
insert into team (name, company_id)
values ('Grancel', 3);
insert into team (name, company_id)
values ('Special Operations', 3);
insert into team (name, company_id)
values ('_Admin', 3);
insert into team_permission (company_id, team_id, admin)
values (3, 15, true);
insert into team_permission (company_id, team_id, managed_team_id, permission_ids)
values (3, 4, 5, '{1, 2, 3, 4, 5, 6, 7, 8}');
insert into team_permission (company_id, team_id, managed_team_id, permission_ids)
values (3, 6, 7, '{1, 2, 3, 4, 5, 6, 7, 8}');
insert into team_permission (company_id, team_id, managed_team_id, permission_ids)
values (3, 8, 9, '{1, 2, 3, 4, 5, 6, 7, 8}');
insert into team_permission (company_id, team_id, managed_team_id, permission_ids)
values (3, 10, 11, '{1, 2, 3, 4, 5, 6, 7, 8}');
insert into team_permission (company_id, team_id, managed_team_id, permission_ids)
values (3, 12, 13, '{1, 2, 3, 4, 5, 6, 7, 8}');
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id)
values ('Cassius', 'Bright', 'oacbright',
    '80.696.683.10658376.894.453.45.-5581250.307.700.686.-10616.714.952.907.94472791.470.265.300.17234635.758.819.63.162.76477.369.567.233.2435347.160.511.525.5582214.399.483.929.1947235.320.500.198.-9572',
    'oaccbright@orbalac.com', 'Lead Instructor', 15, 3);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Aina', ' Holden', 'oacaholden',
    '167.8.522.-36440.263.484.811.34666621.906.910.214.77826.608.844.602.32384.619.390.534.37340.554.763.540.21811325.156.270.391.12.10525829.624.632.606.904.23784714.1.185.221.562.-26681.205.475.554.-26839',
    'oacaholden@orbalac.com', 'Receptionist', 4, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Scherazard', 'Harvey', 'oacsharvey',
    '966.428.512.37100734.622.565.838.592.20281532.84.857.188.806.71296.228.343.596.9064481.575.550.906.285.-355065.655.770.620.24018080.824.202.46.649.5204271.736.862.83.98051518.822.573.452.31252689.310.501.568.44.21078506.444',
    'oacsharvey@orbalac.com', 'Instructor', 5,  3, 9);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Estelle', 'Bright', 'oacebright',
    '365.832.47.48493276.34.668.375.4499327.480.430.766.15258.194.56.179.25692349.698.135.482.45873.312.245.158.-10909.141.459.784.5414928.280.792.947.654.60081.411.998.951.54249533.61.947.671.7979687',
    'oacebright@orbalac.com', 'Intern', 5, 3, 9);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Joshua', 'Bright', 'oacjbright',
    '286.310.610.-15798.296.650.590.-12038.870.314.954.73094.89.232.468.3383637.451.130.302.354.-34950.102.735.479.13576935.210.635.545.4885605.863.219.263.114054456.936.752.853.-6219729.912.608.973.-6138602',
    'oacjbright@orbalac.com', 'Intern', 5, 3, 9);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Lugran', 'Hirai', 'oaclhirai',
    '561.341.741.-550935.726.132.862.51260.435.494.143.57450810.494.350.418.19330.320.235.691.42417995.598.652.594.33844.573.966.765.-735632.491.873.108.18193623.243.798.23.493.-4139773',
    'oaclhirai@orbalac.com', 'Receptionist', 6, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Agate', 'Crosner', 'oacacrosner',
    '99.337.331.13055995.64.583.952.2296889.976.163.907.749.5561371.898.874.899.118709739.593.865.166.30671.916.671.89.-6254449.362.825.494.-2793.103.456.212.4174134.904.193.230.846.-28828.587.315.280.22431303.141.346.650.162.-5186',
    'oacacrosner@orbalac.com', 'Instructor', 7, 3, 13);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Olivier', 'Lenheim', 'oacolenheim',
    '366.100.942.-1508.208.964.949.4852635.539.781.109.-182531.415.248.341.1793704.116.827.741.6472022.507.563.457.304743.32.277.159.4249797.324.419.958.-7819.477.492.162.13928.515.945.208.20076845.69.434.251.87.57503081',
    'oacolenheim@orbalac.com', 'Special Operations Contractor', 14, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Jean', 'Ishikawa', 'oacjishikawa',
    '47.657.160.1804472.769.455.910.659.60071239.889.176.179.117548288.181.528.584.6881273.822.313.831.707.41377023.784.456.647.104398288.403.773.889.1903305.144.216.545.5876585.436.912.235.57768732.679.154.886.39496.80.643.664.3349837.927.369.24.174.-654',
    'oacjishikawa@orbalac.com', 'Receptionist', 8, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kloe', 'Rinz', 'oackrinz',
    '33.542.320.1266889.893.666.484.49.-2113567.720.717.504.26262723.171.753.691.803.99864411.302.133.5.3633208.424.0.504.16202736.963.487.772.477.630572.295.207.16.12354688.979',
    'oackrinz@orbalac.com', 'Contractor', 9, 3, 16);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kilika', 'Rouran', 'oackrouran',
    '331.0.375.43962930.781.768.512.28035570.352.274.37.480.9994661.913.627.900.684.23959278.849.207.787.660.8229119.349.184.902.244.7243546.799.650.150.381.-1994172.332.410.230.-7466.686.598.289.-2343062.477.170.351.63125386',
    'oackrouran@orbalac.com', 'Receptionist', 10, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Zane', 'Vathek', 'oaczvathek',
    '413.585.404.15861506.699.72.472.565.6920567.167.886.984.6090773.607.528.533.562.29035.245.954.254.-24432.537.790.869.-148620.497.63.602.21339.729.282.423.96368554.395.608.231.52060616.553.734.207.73104578',
    'oaczvathek@orbalac.com', 'Instructor', 11, 3, 18);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Tita', 'Russell', 'oactrussell',
    '792.458.789.-4296252.360.774.458.-2818.765.930.743.101134666.60.62.165.7634578.396.652.473.2115909.320.368.260.12969232.301.938.9.969.-6608871.439.71.497.1409215.814.332.362.61268.121.752.284.4786613.59.569.207.877.-644199',
    'oactrussell@orbalac.com', 'Contractor', 11, 3, 18);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Elnan', 'Kishio', 'oacekishio',
    '338.800.337.3065246.588.386.515.77800724.539.766.86.23654.93.750.921.6659612.855.474.393.-5141910.703.141.137.-2723811.252.428.886.-21412.630.325.64.24196085.889.208.557.303.27534349.280.784.551.37150204',
    'oacekishio@orbalac.com', 'Receptionist', 12, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kurt', 'Nardin', 'oacknardin',
    '148.79.427.19716787.253.923.949.4168189.299.365.644.10906258.141.51.995.87.6640870.243.214.11.32166491.40.582.434.-46674.562.774.768.22560154.208.270.694.297.3857750.344.133.601.2795641.56.369.89.7321593',
    'oacknardin@orbalac.com', 'Instructor', 13, 3, 21);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Anelace', 'Elfead', 'oacaelfead',
    '204.692.97.5237814.961.651.320.34497327.80.322.166.347.42624594.324.503.37.3060728.354.289.556.13185857.285.598.544.196.23197670.677.989.353.155.130726091.81.113.959.10575513.267.246.7.35082986.452.876.860.17184616.993',
    'oacaelfead@orbalac.com', 'Intern', 13, 3, 21);