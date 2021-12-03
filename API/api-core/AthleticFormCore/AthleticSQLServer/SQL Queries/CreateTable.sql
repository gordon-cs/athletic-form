-- Create table
use AthleticDatabase
create table dbo.[AthleticDatabase.AthleticEvents] (
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

