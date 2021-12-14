create view dbo.[StudentsEnrolledIn] as (
    SELECT * FROM dbo.[AthleticDatabase.account] AS A 
        INNER JOIN dbo.[AthleticDatabase.STUDENT_CRS_HIST] AS SCH ON A.gordon_id = SCH.ID_NUM
)