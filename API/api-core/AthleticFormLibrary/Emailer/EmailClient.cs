using AthleticFormLibrary.Interfaces;
using System.Net.Mail;
using System.Net;
using AthleticFormLibrary.DataAccess;
using System.Collections.Generic;
using System.Linq;
using AthleticFormLibrary.Utilities;
using System;

namespace AthleticFormLibrary.Emailer
{
    public class EmailClient : IEmailer
    {
        private readonly IReportGeneration _generator;
        private readonly AthleticContext _athleticContext;

        public EmailClient(AthleticContext athleticContext, IReportGeneration generator) {
            _athleticContext = athleticContext;
            _generator = generator;
        }

        public List<MailMessage> WeeklyMail(string fromEmail, string password, string toEmails = "", int number = 0)
        {
            List<MailMessage> mailMessages = new List<MailMessage>();
            if (string.IsNullOrEmpty(toEmails)) {
                string year = YearTermCodeHelper.CalculateYearCode(DateTime.Now);
                string term = YearTermCodeHelper.CalculateTermCode(DateTime.Now);
                List<string> courses = _athleticContext.AthleticConflicts.Where(a => a.YearCode == year 
                    && a.TermCode == term).Select(c => c.CourseCode).Distinct().ToList();
                foreach (string m in courses)
                {
                    int profId = _athleticContext.SectionSchedules.Where(p => p.crs_cde == m 
                        && p.yr_cde == year && p.trm_cde == term).Select(x => x.PROFESSOR_ID_NUM).FirstOrDefault();
                    string emailAddress = _athleticContext.Accounts.Where(x => x.Gordon_ID == profId.ToString()).Select(c => c.Email).FirstOrDefault();
                    if (emailAddress != null)
                    {
                        mailMessages.Add(SendMail(fromEmail, password, m, emailAddress));
                    }
                }
            } else {
                string[] toEmailsAsArray = toEmails.Split(',');
                foreach (var toEmail in toEmailsAsArray) {
                    mailMessages.Add(SendMail(fromEmail, password, "", toEmail, number));
                }
            }
            return mailMessages;
        }

        public MailMessage SendMail(string fromEmail, string password, string course, string profEmail, int number = 0) {
            System.Diagnostics.Debug.WriteLine("EMAIL...");
            using (var smtp = Injector.Resolve<SmtpClient>()) {
                /*replace with your email */
                var from_email = fromEmail;
                var credential = new NetworkCredential {
                    //replace with your password
                    UserName = fromEmail,
                    Password = password
                };
                smtp.Credentials = credential;
                smtp.Host = "smtp.office365.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                var message = new MailMessage();
                message.From = new MailAddress(from_email);
                //message.Bcc.Add(new MailAddress(from_email));
                message.To.Add(profEmail);
                message.Subject = "Athletics Conflicts for " + course;

                message.Body = _generator.GenerateReport(course, number);
                message.IsBodyHtml = true;

                smtp.Send(message);
                return message;
            }
        }
    }
}