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
    ArrivalTime DateTime,
    Comments varchar(255),
    IsScrimmage bit default 0 not null
);

create table [AthleticDatabase.InEvent] (
    EventID int not null,
    Gordon_ID varchar(10) not null,
    primary key(EventID, Gordon_ID)
);

/* table: Opponent - Address, schoolID, name */

set ansi_nulls on;
go
set quoted_identifier on;
go
create table [AthleticDatabase.Account] (
    Gordon_ID varchar(10)  null,
    Nickname  varchar(20)  null,
    FirstName varchar(50)  null,
    LastName  varchar(50)  null,
    Email     varchar(50)  null
);

set ansi_nulls off;
go
set quoted_identifier on;
go
create table [AthleticDatabase.Section_Master] (
    [yr_cde] [char](4) NOT NULL,
    [trm_cde] [char](2) NOT NULL,
    [crs_cde] [char](30) NOT NULL,
    [Lead_Instructor_ID] [int] NULL,
    [crs_title] [char](35) NULL,
    [sess_cde] [char](8) NULL,
);

SET ANSI_NULLS OFF;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [ATHLETICDATABASE.SECTION_SCHEDULES] ( 
    [YR_CDE] [char](4) NOT NULL,
    [TRM_CDE] [char](2) NOT NULL,
    [CRS_CDE] [char](30) NOT NULL,
    [MONDAY_CDE] [char](1) NULL,
    [TUESDAY_CDE] [char](1) NULL,
    [WEDNESDAY_CDE] [char](1) NULL,
    [THURSDAY_CDE] [char](1) NULL,
    [FRIDAY_CDE] [char](1) NULL,
    [SATURDAY_CDE] [char](1) NULL,
    [SUNDAY_CDE] [char](1) NULL,
    [BEGIN_TIM] [datetime] NULL,
    [END_TIM] [datetime] NULL,
);

SET ANSI_NULLS OFF;
GO
SET QUOTED_IDENTIFIER ON;
GO
CREATE TABLE [AthleticDatabase.STUDENT_CRS_HIST] (
    [ID_NUM] [int] NOT NULL,
    [YR_CDE] [char](4) NOT NULL,
    [TRM_CDE] [char](2) NOT NULL,
    [CRS_CDE] [char](30) NULL,
);

/* Roster - SID, TID */