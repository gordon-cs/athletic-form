/*
    We need the students where the student is in a class and athletic event
    where the depart time overlaps with class start and/or end time
*/

create view Conflicts as (
    select ie.EventID, s.FirstName, s.LastName, 
         c.CourseCode, ae.DepartureTime, c.CourseStartTime, c.CourseEndTime
            from dbo.[AthleticDatabase.AthleticEvents] ae
                inner join dbo.[AthleticDatabase.InEvent] ie on ie.EventID = ae.EventID
                inner join dbo.[AthleticDatabase.Student] s on s.StudentID = ie.StudentID
                inner join dbo.[AthleticDatabase.Class] c on c.CourseStartTime = ae.DepartureTime     
);

