using System.Net.Mail;
using System.Collections.Generic;

namespace AthleticFormLibrary.Interfaces {
    public interface IEmailer {
        List<MailMessage> WeeklyMail(string emails = "", int number = 0);
        MailMessage SendMail(string major, string profEmail, int number = 0);
    }
}