using AthleticFormLibrary.Interfaces;
using System.Net.Mail;
using System.Net;
using AthleticFormLibrary.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace AthleticFormLibrary.Emailer
{
    public class EmailClient : IEmailer
    {
        private readonly IReportGeneration _generator;
        private readonly AthleticContext _athleticContext;
        private readonly AccountContext _accountContext;
        private readonly ScheduleContext _scheduleContext;

        public EmailClient(AthleticContext athleticContext, IReportGeneration generator, AccountContext accountContext, 
            ScheduleContext scheduleContext) {
            _athleticContext = athleticContext;
            _generator = generator;
            _accountContext = accountContext;
            _scheduleContext = scheduleContext;
        }

        public List<MailMessage> WeeklyMail(string emails = "")
        {
            List<MailMessage> mailMessages = new List<MailMessage>();
            if (string.IsNullOrEmpty(emails)) {
                List<string> courses = _athleticContext.AthleticConflicts.Select(c => c.CourseCode).Distinct().ToList();
                foreach (string m in courses)
                {
                    int profId = _scheduleContext.SectionSchedules.Where(p => p.crs_cde == m).Select(x => x.PROFESSOR_ID_NUM).FirstOrDefault();
                    string emailAddress = _accountContext.Accounts.Where(x => x.Gordon_ID == profId.ToString()).Select(c => c.Email).FirstOrDefault();
                    mailMessages.Add(SendMail(m, emailAddress));
                }
            } else {
                string[] emailsAsArray = emails.Split(',');
                foreach (var email in emailsAsArray) {
                    mailMessages.Add(SendMail("", email));
                }
            }
            return mailMessages;
        }

        public MailMessage SendMail(string course, string profEmail) {
            System.Diagnostics.Debug.WriteLine("EMAIL...");
            using (var smtp = Injector.Resolve<SmtpClient>()) {
                /*replace with your email */
                var from_email = "first.last@gordon.edu";
                var credential = new NetworkCredential {
                    //replace with your password
                    UserName = "first.last@gordon.edu",
                    Password = "password"
                };
                smtp.Credentials = credential;
                smtp.Host = "smtp.office365.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                var message = new MailMessage();
                message.From = new MailAddress(from_email);
                //message.Bcc.Add(new MailAddress(from_email));
                message.To.Add(profEmail);
                message.Subject = "Athletic Conflicts";

                message.Body = _generator.GenerateReport(course);
                message.IsBodyHtml = true;

                smtp.Send(message);
                return message;
            }
        }
    }
}