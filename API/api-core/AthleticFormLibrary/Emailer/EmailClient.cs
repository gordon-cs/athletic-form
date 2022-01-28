using AthleticFormLibrary.Interfaces;
using System.Net.Mail;
using System.Net;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Utilities;
using System.Collections.Generic;

namespace AthleticFormLibrary.Emailer
{
    public class EmailClient : IEmailer
    {
        private readonly AthleticContext _context;
        public EmailClient() {
            
        }

        public EmailClient(AthleticContext context) {
            _context = context;
        }

        public void SendMail(string major) {
            using (var smtp = new SmtpClient()) {
                /*replace with your email */
                var from_email = "email";
                var credential = new NetworkCredential {
                    //replace with your password
                    UserName = from_email,
                    Password = "password"
                };
                smtp.Credentials = credential;
                smtp.Host = "smtp.office365.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                var message = new MailMessage();
                message.From = new MailAddress(from_email);
                //message.Bcc.Add(new MailAddress(from_email));
                /*Eventually, replace with professor email */
                message.To.Add("email");
                message.Subject = "Athletic Conflicts";

                ReportGenerator reportGenerator = new ReportGenerator(_context);
                message.Body = reportGenerator.GenerateReport(major);
                message.IsBodyHtml = true;

                smtp.Send(message);
            }
        }
    }
}