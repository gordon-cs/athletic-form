-- Insert statements --
use AthleticDatabase;

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime) 
values 
    ('Rowing', 'Endicott', 'Home', 'Gull Pond', '12/28/2021 2:30 PM', '12/28/2021 2:00 PM', '12/28/2021 4:00 PM');

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime) 
values 
    ('Soccer', 'EMCC', 'Away', 'EMCC Soccer Field', '12/28/2021 5:30 AM', '12/28/2021 4:45 AM', '12/28/2021 7:30 AM');

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime) 
values 
    ('Tennis', 'UMO', 'Away', 'UMO Courts', '12/24/2021 2:50 PM', '12/24/2021 5:00 AM', '12/25/2021 3:00 PM');


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime) 
values 
    ('Baseball', 'PSU', 'Away', 'PSU Stadium', '12/28/2021 3:00 PM', '12/28/2021 1:00 AM', '12/29/2021 3:00 PM');


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime, ArrivalTime) 
values 
    ('Basketball', 'UMF', 'Away', 'UMF Baseball Field', '10/25/2021 2:30 PM', '10/25/2021 4:30 AM', '10/26/2021 3:00 PM');


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


-- InEvent
insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('1', '50208495');

insert into dbo.[AthleticDatabase.InEvent] 
    (EventID, Gordon_ID)
values 
    ('1', '20408095');


insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('2', '26404093');

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('2', '42208495');      

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('3', '50208295');

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('3', '50208495');

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('4', '20408095');  

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('4', '26404093');  

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('5', '26404093');  

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, Gordon_ID)
values 
    ('5', '42208495');