namespace AthleticFormLibrary.Interfaces {
    public interface IEmailer {
        void WeeklyMail();
        void SendMail(string major, string profEmail);
    }
}