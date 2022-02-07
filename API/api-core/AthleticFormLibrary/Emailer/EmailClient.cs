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
        private readonly AthleticContext _context;

        public EmailClient(AthleticContext context, IReportGeneration generator) {
            _context = context;
            _generator = generator;

        }

        public void WeeklyMail()
        {
            List<string> courses = _context.AthleticConflicts.Select(c => c.CourseCode).Distinct().ToList();
            foreach (string m in courses)
            {
                int profId = _context.SectionMaster.Where(p => p.crs_cde == m).Select(x => x.Lead_Instructor_ID).FirstOrDefault();
                string emailAddress = _context.Accounts.Where(x => x.Gordon_ID == profId.ToString()).Select(c => c.Email).FirstOrDefault();
                SendMail(m, emailAddress);
            }
        }

        public void SendMail(string course, string profEmail) {
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
            }
        }
    }
}