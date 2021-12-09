/*
    We need the students where the student is in a class and athletic event
    where the depart time overlaps with class start and/or end time
*/

create view Conflicts as (
    select ie.EventID, ae.DepartureTime, s.FirstName, s.LastName, c.CourseCode, c.CourseMeetingTime
        from dbo.[AthleticDatabase.AthleticEvents] ae
            inner join dbo.[AthleticDatabase.InEvent] ie on ie.EventID = ae.EventID
            inner join dbo.[AthleticDatabase.Student] s on s.StudentID = ie.StudentID 
            inner join dbo.[AthleticDatabase.Class] c on c.CourseMeetingTime = ae.DepartureTime     
);

