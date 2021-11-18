drop table if exists [AthleticDatabase.AthleticEvents]

-- Create table statements --
create table dbo.[AthleticDatabase.AthleticEvents] (
    EventID int identity(1,1),
    Sport varchar(25),
    Opponent varchar(50),
    HomeOrAway varchar(4),
    Destination varchar(30),
    EventDate Date,
    EventTime Time,
    primary key(EventID)
);
