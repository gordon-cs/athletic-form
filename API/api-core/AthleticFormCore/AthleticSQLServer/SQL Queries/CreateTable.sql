-- Create tables

create table [AthleticDatabase.AthleticEvents] (
    EventID int identity(1,1),
    IsDeleted bit default 0 not null,
    Sport varchar(25),
    Opponent varchar(50),
    HomeOrAway varchar(4),
    Destination varchar(30),
    EventDate DateTime,
    DepartureTime DateTime,
    primary key(EventID)
);


create table [AthleticDatabase.Student] (
    StudentID varchar(8) not null,
    FirstName varchar(15) not null,
    LastName varchar(15) not null,
    primary key(StudentID)
);

create table [AthleticDatabase.InEvent] (
    EventID int references [AthleticDatabase.AthleticEvents](EventID),
    StudentID varchar(8) references [AthleticDatabase.Student] not null,
    primary key(EventID, StudentID)
);

create table [AthleticDatabase.Class] (
    CourseCode varchar(8) not null,
    CourseStartTime DateTime,
    CourseEndTime DateTime,
    primary key(CourseCode)
);