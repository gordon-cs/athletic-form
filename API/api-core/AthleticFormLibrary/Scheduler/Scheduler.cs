using System;

namespace AthleticFormLibrary.Scheduler
{
    public static class Scheduler
    {
        public static void StartEmailScheduler(int month, int day, int hour, int min)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, month, day, hour, min, 0, 0);
            EmailScheduler.Instance.ScheduleWeeklyTask(startDate);
        }

        public static void StartTestScheduler(int month, int day, int hour, int min)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, month, day, hour, min, 0, 0);
            EmailScheduler.Instance.ScheduleTestTask(startDate);
        }
    }
}