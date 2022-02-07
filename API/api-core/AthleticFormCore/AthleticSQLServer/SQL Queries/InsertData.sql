-- Insert statements --
use AthleticDatabase;

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime, Comments, IsScrimmage) 
values 
    ('Rowing', 'Endicott', 'Home', 'Gull Pond', '12/28/2021 2:30 PM', '12/28/2021 2:00 PM', '12/28/2021 4:00 PM', 'MIT and Harvard are also playing.', 1);

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime, IsScrimmage) 
values 
    ('Soccer', 'EMCC', 'Away', 'EMCC Soccer Field', '12/28/2021 5:30 AM', '12/28/2021 4:45 AM', '12/28/2021 7:30 AM', 0);

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime, Comments, IsScrimmage) 
values 
    ('Tennis', 'UMO', 'Away', 'UMO Courts', '12/24/2021 2:50 PM', '12/24/2021 5:00 AM', '12/25/2021 3:00 PM', 'Departure time and event date are on Christmas Eve.  Arrival time on Christmas.', 0);


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime, Comments, IsScrimmage) 
values 
    ('Baseball', 'PSU', 'Away', 'PSU Stadium', '12/28/2021 3:00 PM', '12/28/2021 1:00 AM', '12/29/2021 3:00 PM', 'Overnight', 0);


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime, Comments, IsScrimmage) 
values 
    ('Basketball', 'UMF', 'Away', 'UMF Baseball Field', '10/25/2021 2:30 PM', '10/25/2021 4:30 AM', '10/26/2021 3:00 PM', 'Overnight', 0);


-- Section inserts
insert into dbo.[AthleticDatabase.SECTION_SCHEDULES]
    (yr_cde, trm_cde, crs_cde, monday_cde, wednesday_cde, friday_cde, begin_tim, end_tim)
values 
    ('2021', 'SP', 'CPS353', 'M', 'W', 'F', '1900-01-01 12:40 PM', '1900-01-01 1:40 PM')

insert into dbo.[AthleticDatabase.SECTION_SCHEDULES]
    (yr_cde, trm_cde, crs_cde, tuesday_cde, thursday_cde, begin_tim, end_tim)
values 
    ('2021', 'FA', 'COM101', 'T', 'R ', '1900-01-01 9:45 AM', '1900-01-01 11:20 AM')


-- Section Master inserts
insert into dbo.[AthleticDatabase.Section_Master]
    (yr_cde, trm_cde, crs_cde, Lead_Instructor_ID, crs_title, sess_cde)
values
    ('2021', 'SP', 'CPS353', 1, 'Internet Programming', '821786')


insert into dbo.[AthleticDatabase.Section_Master]
    (yr_cde, trm_cde, crs_cde, Lead_Instructor_ID, crs_title, sess_cde)
values
    ('2021', 'FA', 'COM101', 2, 'Visual Storytelling', '821776')


-- Account inserts
insert into dbo.[AthleticDatabase.Account] 
    (Gordon_ID, Nickname, FirstName, LastName, Email)
values
    ('50208495', 'Anth', 'Anthony', 'Aardvark', 'Anthony.Aardvark@gordon.edu');

insert into dbo.[AthleticDatabase.Account] 
    (Gordon_ID,  Nickname, FirstName, LastName, Email)
values
    ('50208295', 'Charlene', 'Charlene', 'Cat', 'Charlene.Cat@gordon.edu');    

insert into dbo.[AthleticDatabase.Account] 
    (Gordon_ID, Nickname, FirstName, LastName, Email)
values
    ('42208495', 'Boris', 'Boris', 'Buffalo', 'Boris.Buffalo@gordon.edu');


insert into dbo.[AthleticDatabase.Account]
    (Gordon_ID, Nickname, FirstName, LastName, Email)
values 
    ('20408095', 'Aud', 'Audrey', 'Antelope', 'Audrey.Antelope@gordon.edu');


insert into dbo.[AthleticDatabase.Account]
    (Gordon_ID, Nickname, FirstName, LastName, Email)
values 
    ('26404093', 'Sammy', 'Samantha', 'Squirel', 'Samantha.Squirell@gordon.edu');


-- Class History inserts

insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('50208495', '2021', 'SP', 'CPS353')


insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('20408095', '2021', 'SP', 'CPS353')


insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('42208495', '2021', 'SP', 'CPS353')



insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('50208495', '2021', 'FA', 'COM101')


insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('20408095', '2021', 'FA', 'COM101')


insert into dbo.[AthleticDatabase.Student_Crs_Hist]
    (id_num, yr_cde, trm_cde, crs_cde) 
values
    ('42208495', '2021', 'SP', 'COM101')



insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Baseball');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Basketball');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Cross Country');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Golf');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Lacrosse');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Rowing');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Soccer');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Swimming');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values  
    ('M Tennis');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('M Track & Field');

    insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Basketball');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Cross Country');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Field Hockey');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Lacrosse');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Rowing');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Soccer');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Softball');


insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Swimming');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values  
    ('W Tennis');

insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Track & Field');

    insert into dbo.[AthleticDatabase.Teams] 
    (TeamName)
values
    ('W Vollyball');


insert into dbo.[AthleticDatabase.InTeam] 
    (TeamName, Gordon_ID)
values
    ('W Softball', '26404093');

insert into dbo.[AthleticDatabase.InTeam] 
    (TeamName, Gordon_ID)
values
    ('W Basketball', '20408095');


insert into dbo.[AthleticDatabase.InTeam] 
    (TeamName, Gordon_ID)
values
    ('M Baseball', '50208495');


insert into dbo.[AthleticDatabase.InTeam] 
    (TeamName, Gordon_ID)
values
    ('M Baseball', '42208495');


-- Professor Inserts (for email testing)
insert into [AthleticDatabase].[dbo].[AthleticDatabase.Account]
    (Gordon_ID
      ,Nickname
      ,FirstName
      ,LastName
      ,Email)
values
    ('1', 'Professor', 'Jacob', 'Christopher', 'jacob.christopher@gordon.edu'),
    ('2', 'Professor', 'Aidan', 'Perez', 'aidan.perez@gordon.edu')