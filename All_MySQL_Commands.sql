create table studentinformation(
Number int primary key ,
Name varchar(40),
Department varchar(20),
City varchar(30),
PassedoutYear decimal(4)
);     
-- This is For TableCreation.--

describe studentinformation;
-- This is for after the table creation . they show the full table.
-- This is only shows the table heading names.


insert into studentinformation values(1 , "AAA","CSE","India",2024);
-- This is for insert the values of the table.


Select*from studentinformation;
-- After insert the values. YOu can see the updated insert values for the table using this command.


insert into studentinformation values(2, "BBB","ECE","India",2024),(3, "ccc","EEE","America",2025),(4, "DDD","CSE","Canada",2025),(5, "EEEE","CSE","UAE",2026);
-- This is the command for insert the value in  a same line . with multiple details.


select*from studentinformation where  Department ="CSE";
-- This command you can see the some selective properties. Eg: You dont know how many people are studied in cse. just use this command.


select*from studentinformation where name<> "BBB";
-- This command shows the exapmle like i need all data except people who have the name of "BBB". .


select* from studentinformation where city <>"India";
-- This command shows the exapmle like i need all data except people who have the city  name of "India". .
-- We can search anything about like these. based on the table. 


select name , city from studentinformation;
-- This command you can see some selective information. like you need to know only some information in the table. 


select*from studentinformation where passedoutyear>2025 ;
-- This command help some selective passedout year student .


select*from studentinformation where passedoutyear >2023 and city="india";
-- This command show the passedout student in india only 2024 batch to upto entire dataset.


select name from studentinformation where name="AAA";
-- This command shows a individual  person name . we can access and see anything in database see individually.


select city from studentinformation where city="india";
-- we can see some selective city .


select number,name,department from studentinformation where department  ="cse" or department ="ece";
-- This means we can see a multiple information from the multiple details . i need only cse,ece department only with there name and number only .


select*from studentinformation where department in("ECE","cse");

select*from studentinformation where department in("cse") and city="uae";
-- we can access anything from the databse. just remember the basics of command queries only. 


select*from studentinformation where department not in("ece","cse");
-- This command shows the all data except the ece and cse deaprtment. 

select*from studentinformation where passedoutYear between 2023 and 2025;
-- This command only shows the information about shows the passedoutstudent only 2023 - 2025. 


select*from studentinformation limit 2;
-- This command only show the 2 data's. some times lot of  sme details is there . so we read some data's only. so we can use this command.


select *from studentinformation where passedoutyear  between 2020 and 2025 limit 3;
-- This command selectively give the result like show only top3 passedout student between 2020 and 2025. 


select*from studentinformation where name  like 'a%';
-- This command shows only the people name who are all start the name with 'a'. shows all the starting name with a.


select*from studentinformation where name not like 'a%';
-- This command show all the data except pepole who's name start with 'a'. 


insert into studentinformation values (6, "xxxx","IT","Australia",2020),(7, "yyyy","B.tech","Newzweland ",2023);
-- If we forgot some details in add the table . use this command any time .


select* from studentinformation where name like 'x%x';
-- This means people name start with x and end with x . all the data shows start with and end with . 


select * from studentinformation where department like '%e%';
-- This command shows , shows all the department 'e' only e is occured . show the only e occured department. 

--  select * from studentinformation where department like '%c%'; --


select * from studentinformation where department like '_c%';

-- This command shows c occured in 2nd letter of the department name . show all the department , which one have 2nd letter of c .


select*from studentinformation where city not like '_u%';

-- This command dosen't show the city name . which have a 2nd letter 'U'.



update studentinformation  set city="Indian" where city="India"; 
update employee set role="actor" where role="don";



SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 1;


keep watching me . I will update everything soon.....
