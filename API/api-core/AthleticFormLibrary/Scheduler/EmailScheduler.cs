using System;
using System.Collections.Generic;
using System.Threading;
using AthleticFormLibrary.Emailer;

namespace AthleticFormLibrary.Scheduler
{
    public class EmailScheduler
    {
        private static EmailScheduler _instance;
        private List<Timer> timers = new List<Timer>();

        private EmailScheduler() { }

        public static EmailScheduler Instance => _instance ?? (_instance = new EmailScheduler());

        public void ScheduleWeeklyTask(DateTime firstRun)
        {
            DateTime now = DateTime.Now;
            if (now > firstRun) {
                firstRun = firstRun.AddDays(7);
            }

            TimeSpan timeRemaining = firstRun - now;
            if (timeRemaining <= TimeSpan.Zero) {
                timeRemaining = TimeSpan.Zero;
            }

            var timer = new Timer(x => {
                EmailClient emailer = new EmailClient();
                emailer.SendMail("");
            }, null, timeRemaining, TimeSpan.FromDays(7));

            timers.Add(timer);
        }

        public void ScheduleTestTask(DateTime firstRun)
        {
            DateTime now = DateTime.Now;
            if (now > firstRun) {
                firstRun = firstRun.AddMinutes(2);
            }

            TimeSpan timeRemaining = firstRun - now;
            if (timeRemaining <= TimeSpan.Zero) {
                timeRemaining = TimeSpan.Zero;
            }

            var timer = new Timer(x => {
                System.Diagnostics.Debug.WriteLine("Scheduled Task executing at: " + DateTime.Now);
                EmailClient emailer = new EmailClient();
                emailer.SendMail("");
            }, null, timeRemaining, TimeSpan.FromMinutes(2));

            timers.Add(timer);
        }
    }
}