USE [master]
GO
/****** Object:  Database [AthleticDatabase]    Script Date: 2/1/2022 11:45:26 PM ******/
CREATE DATABASE [AthleticDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AthleticDatabase', FILENAME = N'/var/opt/mssql/data/AthleticDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AthleticDatabase_log', FILENAME = N'/var/opt/mssql/data/AthleticDatabase_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [AthleticDatabase] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AthleticDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AthleticDatabase] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AthleticDatabase] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AthleticDatabase] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AthleticDatabase] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AthleticDatabase] SET ARITHABORT OFF 
GO
ALTER DATABASE [AthleticDatabase] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AthleticDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AthleticDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AthleticDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AthleticDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AthleticDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AthleticDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AthleticDatabase] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AthleticDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AthleticDatabase] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AthleticDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AthleticDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AthleticDatabase] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AthleticDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AthleticDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AthleticDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AthleticDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AthleticDatabase] SET RECOVERY FULL 
GO
ALTER DATABASE [AthleticDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [AthleticDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AthleticDatabase] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AthleticDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AthleticDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AthleticDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AthleticDatabase] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'AthleticDatabase', N'ON'
GO
ALTER DATABASE [AthleticDatabase] SET QUERY_STORE = OFF
GO
USE [AthleticDatabase]
GO
/****** Object:  Table [dbo].[AthleticDatabase.Account]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.Account](
	[Gordon_ID] [varchar](10) NULL,
	[Nickname] [varchar](20) NULL,
	[FirstName] [varchar](50) NULL,
	[LastName] [varchar](50) NULL,
	[Email] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AthleticDatabase.STUDENT_CRS_HIST]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.STUDENT_CRS_HIST](
	[ID_NUM] [int] NOT NULL,
	[YR_CDE] [char](4) NOT NULL,
	[TRM_CDE] [char](2) NOT NULL,
	[CRS_CDE] [char](30) NULL
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[StudentsEnrolledIn]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[StudentsEnrolledIn] as (
    SELECT * FROM dbo.[AthleticDatabase.account] AS A 
        INNER JOIN dbo.[AthleticDatabase.STUDENT_CRS_HIST] AS SCH ON A.gordon_id = SCH.ID_NUM
)
GO
/****** Object:  Table [dbo].[AthleticDatabase.AthleticEvents]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.AthleticEvents](
	[EventID] [int] IDENTITY(1,1) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[Sport] [varchar](25) NULL,
	[Opponent] [varchar](50) NULL,
	[HomeOrAway] [varchar](4) NULL,
	[Destination] [varchar](30) NULL,
	[EventDate] [datetime] NULL,
	[DepartureTime] [datetime] NULL,
	[ArrivalTime] [datetime] NULL,
	[Comments] [varchar](255) NULL,
	[IsScrimmage] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AthleticDatabase.InEvent]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.InEvent](
	[EventID] [int] NOT NULL,
	[Gordon_ID] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[EventID] ASC,
	[Gordon_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ATHLETICDATABASE.SECTION_SCHEDULES]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ATHLETICDATABASE.SECTION_SCHEDULES](
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
	[END_TIM] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[Conflicts]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
    We need the students where the student is in a class and athletic event
    where the depart time overlaps with class start and/or end time
*/

create view [dbo].[Conflicts] as (
    select distinct top 1000 ie.EventID, acc.FirstName, acc.LastName, acc.Email,
        ae.DepartureTime, datename(weekday ,ae.DepartureTime) as DayOfWeek,
            sched.begin_tim as CourseBeginTime, sched.END_TIM as CourseEndTime, h.crs_cde as CourseCode from    
                dbo.[AthleticDatabase.InEvent] ie
                    inner join dbo.[AthleticDatabase.Student_Crs_Hist] h on h.Id_Num = ie.Gordon_ID
                    inner join dbo.[AthleticDatabase.Section_Schedules] sched on  sched.CRS_CDE = h.crs_cde
                    inner join dbo.[AthleticDatabase.AthleticEvents] ae on ae.EventID = ie.EventID
                    inner join dbo.[AthleticDatabase.Account] acc on acc.Gordon_ID = ie.Gordon_ID
                
                    where (
                        (
                            datepart(hour, ae.DepartureTime) <= datepart(hour, sched.begin_tim)    
                            or ((datepart(hour, ae.DepartureTime) <= datepart(hour, sched.end_tim)) 
                            and datepart(hour, ae.DepartureTime) >= datepart(hour, sched.begin_tim))
                        )
                        and 
                        (
                            substring(datename(weekday, ae.DepartureTime), 1, 1) = sched.MONDAY_CDE or
                            substring(datename(weekday, ae.DepartureTime), 1, 1) = sched.TUESDAY_CDE or
                            substring(datename(weekday, ae.DepartureTime), 1, 1) = sched.WEDNESDAY_CDE or
                            substring(datename(weekday, ae.DepartureTime), 1, 4) = sched.THURSDAY_CDE or
                            substring(datename(weekday, ae.DepartureTime), 1, 1) = sched.FRIDAY_CDE
                        )            
                    )
)
GO
/****** Object:  Table [dbo].[AthleticDatabase.InTeam]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.InTeam](
	[TeamName] [varchar](50) NOT NULL,
	[Gordon_ID] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Gordon_ID] ASC,
	[TeamName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AthleticDatabase.Teams]    Script Date: 2/1/2022 11:45:26 PM ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AthleticDatabase.Teams](
	[TeamName] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TeamName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AthleticDatabase.AthleticEvents] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[AthleticDatabase.AthleticEvents] ADD  DEFAULT ((0)) FOR [IsScrimmage]
GO
USE [master]
GO
ALTER DATABASE [AthleticDatabase] SET  READ_WRITE 
GO
