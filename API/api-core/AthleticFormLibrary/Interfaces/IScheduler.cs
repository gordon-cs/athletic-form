using System;

namespace AthleticFormLibrary.Interfaces
{
    public interface IScheduler {
         void ScheduleWeeklyTask(string email, string password);
         void ScheduleTestTask(string email, string password);
    }
}