using System.Net.Mail;
using System.Collections.Generic;

namespace AthleticFormLibrary.Interfaces {
    public interface IEmailer {
        List<MailMessage> WeeklyMail(string emails = "");
        MailMessage SendMail(string major, string profEmail);
    }
}