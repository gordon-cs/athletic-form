-- Insert statements --
use AthleticDatabase;

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime) 
values 
    ('Rowing', 'Endicott', 'Home', 'Gull Pond', '12/28/2021 2:30 PM', '12/28/2021 2:00 PM');

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime) 
values 
    ('Soccer', 'EMCC', 'Away', 'EMCC Soccer Field', '12/28/2021 5:30 AM', '12/28/2021 4:45 AM');

insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime) 
values 
    ('Tennis', 'UMO', 'Away', 'UMO Courts', '12/24/2021 2:50 PM', '12/24/2021 5:00 AM');


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime) 
values 
    ('Baseball', 'PSU', 'Away', 'PSU Stadium', '12/28/2021 3:00 PM', '12/28/2021 1:00 AM');


insert into dbo.[AthleticDatabase.AthleticEvents] 
    (Sport, Opponent, HomeOrAway, Destination, EventDate, DepartureTime) 
values 
    ('Basketball', 'UMF', 'Away', 'UMF Baseball Field', '10/25/2021 2:30 PM', '10/25/2021 4:30 AM');




-- Class inserts
insert into dbo.[AthleticDatabase.Class]
    (CourseCode, CourseMeetingTime)
values 
    ('CPS121', '10/25/2021 2:30 PM')

insert into dbo.[AthleticDatabase.Class]
    (CourseCode, CourseMeetingTime)
values 
    ('CPS222', '12/28/2021 2:00 PM')




-- Student inserts
insert into dbo.[AthleticDatabase.Student] 
    (StudentID, FirstName, LastName)
values
    ('50208495', 'Anthony', 'Aardvark');

insert into dbo.[AthleticDatabase.Student] 
    (StudentID, FirstName, LastName)
values
    ('50208295', 'Charlene', 'Cat');    

insert into dbo.[AthleticDatabase.Student] 
    (StudentID, FirstName, LastName)
values
    ('42208495', 'Boris', 'Buffalo');


insert into dbo.[AthleticDatabase.Student]
    (StudentID, FirstName, LastName)
values 
    ('20408095', 'Audrey', 'Antelope');


insert into dbo.[AthleticDatabase.Student]
    (StudentID, FirstName, LastName)
values 
    ('26404093', 'Samantha', 'Squirel');


-- InEvent
insert into dbo.[AthleticDatabase.InEvent]
    (EventID, StudentID)
values 
    ('1', '50208495');


insert into dbo.[AthleticDatabase.InEvent]
    (EventID, StudentID)
values 
    ('2', '42208495');    

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, StudentID)
values 
    ('3', '50208295');  

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, StudentID)
values 
    ('4', '20408095');  

insert into dbo.[AthleticDatabase.InEvent]
    (EventID, StudentID)
values 
    ('5', '26404093');  