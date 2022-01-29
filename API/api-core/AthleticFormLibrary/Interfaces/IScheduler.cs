using System;

namespace AthleticFormLibrary.Interfaces
{
    public interface IScheduler {
         void ScheduleWeeklyTask(DateTime firstRun);
         void ScheduleTestTask(DateTime firstRun);
    }
}