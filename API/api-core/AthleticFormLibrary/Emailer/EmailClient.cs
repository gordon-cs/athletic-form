using AthleticFormLibrary.Interfaces;
using System.Net.Mail;
using System.Net;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Utilities;


namespace AthleticFormLibrary.Emailer
{
    public class EmailClient : IEmailer
    {
        private readonly IReportGeneration _generator;

        public EmailClient(IReportGeneration generator) {
            _generator = generator;
        }

        public void SendMail(string major) {
            using (var smtp = Injector.Resolve<SmtpClient>()) {
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

                message.Body = _generator.GenerateReport(major);
                message.IsBodyHtml = true;

                smtp.Send(message);
            }
        }
    }
}