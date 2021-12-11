/*
    We need the students where the student is in a class and athletic event
    where the depart time overlaps with class start and/or end time
*/

create view Conflicts as (
    select distinct top 1000 ie.EventID, acc.Email, ae.DepartureTime, sched.begin_tim as CourseBeginTime, h.crs_cde as CourseCode from    
                dbo.[AthleticDatabase.InEvent] ie
                inner join dbo.[AthleticDatabase.Student_Crs_Hist] h on h.Id_Num = ie.Gordon_ID
                inner join dbo.[AthleticDatabase.Section_Schedules] sched on  sched.CRS_CDE = h.crs_cde
                inner join dbo.[AthleticDatabase.AthleticEvents] ae on ae.EventID = ie.EventID
                inner join dbo.[AthleticDatabase.Account] acc on acc.Gordon_ID = ie.Gordon_ID      
            
);

