using System.Net.Mail;
using System.Collections.Generic;

namespace AthleticFormLibrary.Interfaces {
    public interface IEmailer {
        void WeeklyMail(string fromEmail, string password, string toEmails = "", int number = 0);
        void SendMail(string fromEmail, string password, string major, string profEmail, int number = 0);
    }
}