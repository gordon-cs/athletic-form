CREATE VIEW StudentsEnrolledIn as
    (SELECT [AthleticDatabase.Account].Email, [AthleticDatabase.Section_Master].[crs_cde],
        crs_title, MONDAY_CDE, TUESDAY_CDE, WEDNESDAY_CDE, THURSDAY_CDE, FRIDAY_CDE,
        SATURDAY_CDE, SUNDAY_CDE, BEGIN_TIM, END_TIM FROM [AthleticDatabase.Account]
        JOIN [AthleticDatabase.STUDENT_CRS_HIST] ON [AthleticDatabase.Account].[Gordon_ID] = [AthleticDatabase.STUDENT_CRS_HIST].ID_NUM
        JOIN [ATHLETICDATABASE.SECTION_SCHEDULES] ON  [AthleticDatabase.STUDENT_CRS_HIST].[YR_CDE] = [ATHLETICDATABASE.SECTION_SCHEDULES].YR_CDE
        AND [AthleticDatabase.STUDENT_CRS_HIST].TRM_CDE = [ATHLETICDATABASE.SECTION_SCHEDULES].TRM_CDE
        AND [AthleticDatabase.STUDENT_CRS_HIST].[CRS_CDE] = [ATHLETICDATABASE.SECTION_SCHEDULES].CRS_CDE
        JOIN [AthleticDatabase.Section_Master] ON [ATHLETICDATABASE.SECTION_SCHEDULES].[YR_CDE] = [AthleticDatabase.Section_Master].[yr_cde]
        AND [ATHLETICDATABASE.SECTION_SCHEDULES].[TRM_CDE] = [AthleticDatabase.Section_Master].[trm_cde]
        AND [ATHLETICDATABASE.SECTION_SCHEDULES].[CRS_CDE] = [AthleticDatabase.Section_Master].[crs_cde]);