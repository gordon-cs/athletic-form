using System;
using System.Collections.Generic;
using System.Threading;
using AthleticFormLibrary.Emailer;
using AthleticFormLibrary.Interfaces;

namespace AthleticFormLibrary.Utilities
{
    public class EmailScheduler : IScheduler
    {
       private List<Timer> timers = new List<Timer>();

        private readonly IEmailer _emailer;

        public EmailScheduler(IEmailer emailer) {
            _emailer = emailer;
         }

        public void ScheduleWeeklyTask()
        {
            // Calculate period until first run
            DateTime now = DateTime.Now;
            TimeSpan timeRemaining = timeUntilTask();
            if (timeRemaining <= TimeSpan.Zero)
            {
                timeRemaining = TimeSpan.Zero;
            }

            // Set a timer to indicate when this service should run agian
            var timer = new Timer(x => {
                _emailer.SendMail("");
            }, null, timeRemaining, TimeSpan.FromDays(7));

            timers.Add(timer);
        }

        public void ScheduleTestTask()
        {
            DateTime now = DateTime.Now;
            TimeSpan timeRemaining = timeUntilTask();

            if (timeRemaining <= TimeSpan.Zero) {
                timeRemaining = TimeSpan.Zero;
            }

            var timer = new Timer(x => {
                System.Diagnostics.Debug.WriteLine("Scheduled Task executing at: " + DateTime.Now);
                _emailer.SendMail("");
            }, null, timeRemaining, TimeSpan.FromMinutes(3));

            timers.Add(timer);
        }

            
        /* This method helps the timer set up the period until our first weekly
         * email is sent out.
         */
        private static TimeSpan timeUntilTask()
        {
            // Set the time of weekly mail
            int hour = 6;
            int minute = 00;
            int day = (int)DayOfWeek.Sunday;

            // Create dat objects for now and next sunday
            DateTime now = DateTime.Now;
            int daysUntilSunday = (day - (int)now.DayOfWeek + 7) % 7;
            DateTime nextSunday = now.AddDays(daysUntilSunday);
            TimeSpan ts = new TimeSpan(hour, minute, 0);
            nextSunday = nextSunday.Date + ts;

            // Calculate difference between now and next sunday
            TimeSpan duration = nextSunday - now;

            // If negative, set for next week
            if (duration < TimeSpan.Zero) { duration.Add(TimeSpan.FromDays(7)); }
            return duration;
        }
    }
}