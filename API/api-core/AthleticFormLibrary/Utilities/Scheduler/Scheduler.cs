using System;
using AthleticFormLibrary.Interfaces;

namespace AthleticFormLibrary.Utilities
{
    public class Scheduler {
        private readonly IScheduler _scheduler;
        public Scheduler(IScheduler scheduler) {
            _scheduler = scheduler;
        }
        public void StartEmailScheduler(int month, int day, int hour, int min)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, month, day, hour, min, 0, 0);
            _scheduler.ScheduleWeeklyTask(startDate);
        }

        public void StartTestScheduler(int month, int day, int hour, int min)
        {
            DateTime startDate = new DateTime(DateTime.Now.Year, month, day, hour, min, 0, 0);
            _scheduler.ScheduleTestTask(startDate);
        }
    }
}