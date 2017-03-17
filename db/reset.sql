/*drops all old data*/
drop table if exists permission, employee, team, company;

/*companies, with needed contact info*/
create table company (
    id serial primary key,
    name varchar(255) not null,
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
    name varchar(255) not null,
    permissions varchar(255)[] not null,
    /*need to figure out which teams can do what with which teams*/
);

/*employees, with ids for which company, team, manager they may have be under*/
create table employee (
    id serial primary key,
    company_id int references company(id) not null,
    team_id int references team(id) not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    username varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    role varchar(255),
    reports_to_id int
);

/*available permissions for teams*/
create table permission (
    id serial primary key,
    name varchar(255) not null
);

insert into permission (name)
values ('View Company');
insert into permission (name)
values ('Add Company');
insert into permission (name)
values ('Edit Company');
insert into permission (name)
values ('Delete Company');
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
insert into permission (name)
values ('View Track');
insert into permission (name)
values ('Add Track');
insert into permission (name)
values ('Edit Track');
insert into permission (name)
values ('Delete Track');
insert into permission (name)
values ('View Course');
insert into permission (name)
values ('Add Course');
insert into permission (name)
values ('Edit Course');
insert into permission (name)
values ('Delete Course');
insert into permission (name)
values ('View Session');
insert into permission (name)
values ('Add Session');
insert into permission (name)
values ('Edit Session');
insert into permission (name)
values ('Delete Session');

/*dummy data*/
insert into company (name, address, url, phone, email, point_of_contact)
values ('Fiouse Training Solutions', '1071 S. Kingsbury Road, Springville, UT 84663', 'fiouse.com', '385 399 0297', 'patrick_holley@outlook.com', 1);
insert into team (name, company_id, permissions)
values ('Fiouse_Admin', 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
insert into team (name, company_id, permissions)
values ('Client_Admin', 1, [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
insert into team (name, company_id, permissions)
values ('Client_Default', 1, [5, 9, 13, 17, 21]);

insert into company (name, address, url, phone, email, point_of_contact)
values ('Car Wars', '1977 Millenium Drive, Falcon, TX', 'carwars.com', '722 372 2372', 'cwjsolo@carwars.com', 2);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id)
values ('Juan', 'Solo', 'cwjsolo', 'cwjsolo', 'cwjsolo@carwars.com', 'General Manager', 2, 2);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Lea', 'Solo', 'cwlsolo', 'cwlsolo', 'cwlsolo@carwars.com', 'Financial Manager', 2, 3, 1);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Che', 'Bega', 'cwebega', 'cwebega', 'cwebega@carwars.com', 'Head Mechanic', 2, 3, 1);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Landon', 'Christiansen', 'cwlchristiansen', 'cwlchristiansen', 'cwlchristiansen@carwars.com', 'Mechanic', 2, 3, 3);
insert into employee (first_name, last_name, username, password, email, role, company_id, team_id, reports_to_id)
values ('Seth', 'Rubio', 'cwsrubio', 'cwsrubio', 'cwsrubio@carwars.com', 'Mechanic', 2, 3, 3);

insert into company (name, address, url, phone, email, point_of_contact)
values ('Orbal Arts and Crafts', '236 Rolent Way, Zeiss, Germany', 'orbalac.com', '236 236 2362', 'contact@orbalac.com', 7);
insert into team (name, company_id)
values ('Rolent Power', 2);
insert into team (name, company_id)
values ('Rolent', 2);
insert into team (name, company_id)
values ('Bose Power', 2);
insert into team (name, company_id)
values ('Bose', 2);
insert into team (name, company_id)
values ('Ruan Power', 2);
insert into team (name, company_id)
values ('Ruan', 2);
insert into team (name, company_id)
values ('Zeiss Power', 2);
insert into team (name, company_id)
values ('Zeiss', 2);
insert into team (name, company_id)
values ('Grancel Power', 2);
insert into team (name, company_id)
values ('Grancel', 2);
insert into team (name, company_id)
values ('Special Operations', 2);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id)
values ('Cassius', 'Bright', 'oacbright', 'oaccbright', 'oaccbright@orbalac.com', 'Lead Instructor', 2, 3);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Aina', ' Holden', 'oacaholden', 'oacaholden', 'oacaholden@orbalac.com', 'Receptionist', 4, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Scherazard', 'Harvey', 'oacsharvey', 'oacsharvey', 'oacsharvey@orbalac.com', 'Instructor', 5,  3, 7);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Estelle', 'Bright', 'oacebright', 'oacebright', 'oacebright@orbalac.com', 'Intern', 5, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Joshua', 'Bright', 'oacjbright', 'oacjbright', 'oacjbright@orbalac.com', 'Intern', 5, 3, 8);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Lugran', 'Hirai', 'oaclhirai', 'oaclhirai', 'oaclhirai@orbalac.com', 'Receptionist', 6, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Agate', 'Crosner', 'oacacrosner', 'oacacrosner', 'oacacrosner@orbalac.com', 'Instructor', 7, 3, 11);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Olivier', 'Lenheim', 'oacolenheim', 'oacolenheim', 'oacolenheim@orbalac.com', 'Special Operations Contractor', 14, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Jean', 'Ishikawa', 'oacjishikawa', 'oacjishikawa', 'oacjishikawa@orbalac.com', 'Receptionist', 8, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kloe', 'Rinz', 'oackrinz', 'oackrinz', 'oackrinz@orbalac.com', 'Contractor', 9, 3, 14);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kilika', 'Rouran', 'oackrouran', 'oackrouran', 'oackrouran@orbalac.com', 'Receptionist', 10, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Zane', 'Vathek', 'oaczvathek', 'oaczvathek', 'oaczvathek@orbalac.com', 'Instructor', 11, 3, 16);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Tita', 'Russell', 'oactrussell', 'oactrussell', 'oactrussell@orbalac.com', 'Contractor', 11, 3, 16);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Elnan', 'Kishio', 'oacekishio', 'oacekishio', 'oacekishio@orbalac.com', 'Receptionist', 12, 3, 6);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Kurt', 'Nardin', 'oacknardin', 'oacknardin', 'oacknardin@orbalac.com', 'Instructor', 13, 3, 19);
insert into employee (first_name, last_name, username, password, email, role, team_id, company_id, reports_to_id)
values ('Anelace', 'Elfead', 'oacaelfead', 'oacaelfead', 'oacaelfead@orbalac.com', 'Intern', 13, 3, 20);

select * from permission;