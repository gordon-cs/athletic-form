//Pre-reqs
using System;
using System.Net.Mail;  
using System.Net.Mime;

/*Adding credit where credit is due
https://www.acodersjourney.com/how-to-send-email-using-csharp-and-outlook/

This link helps run it, still working through it
https://www.ipointsystems.com/blog/2018/july/sending-mails-with-c
*/

//I'm going to figure out how this all works later
namespace EmailSender  
{  
    public class EmailManager  
    {  
        private string m_HostName; // your email SMTP server  
  
        public EmailManager(string hostName)  
        {  
            m_HostName = hostName;  
        }  
  
        public void SendMail(EmailSendConfigure emailConfig, EmailContent content)  
        {  
            MailMessage msg = ConstructEmailMessage(emailConfig, content);  
            Send(msg, emailConfig);  
        }  
  
        // Put the properties of the email including "to", "cc", "from", "subject" and "email body"  
        private MailMessage ConstructEmailMessage(EmailSendConfigure emailConfig, EmailContent content)  
        {  
            MailMessage msg = new System.Net.Mail.MailMessage();  
            foreach (string to in emailConfig.TOs)  
            {  
                if (!string.IsNullOrEmpty(to))  
                {  
                    msg.To.Add(to);  
                }  
            }  
  
            foreach (string cc in emailConfig.CCs)  
            {  
                if (!string.IsNullOrEmpty(cc))  
                {  
                    msg.CC.Add(cc);  
                }  
            }  
  
            msg.From = new MailAddress(emailConfig.From, 
                                       emailConfig.FromDisplayName,
                                       System.Text.Encoding.UTF8);  
            msg.IsBodyHtml = content.IsHtml;  
            msg.Body = content.Content;  
            msg.Priority = emailConfig.Priority;  
            msg.Subject = emailConfig.Subject;  
            msg.BodyEncoding = System.Text.Encoding.UTF8;  
            msg.SubjectEncoding = System.Text.Encoding.UTF8;  
  
            if (content.AttachFileName != null)  
            {  
                Attachment data = new Attachment(content.AttachFileName, 
                                                 MediaTypeNames.Application.Zip);  
                msg.Attachments.Add(data);  
            }  
  
            return msg;  
        }  
  
        //Send the email using the SMTP server  
        private void Send(MailMessage message, EmailSendConfigure emailConfig)  
        {  
            SmtpClient client = new SmtpClient();  
            client.UseDefaultCredentials = false;  
            client.Credentials = new System.Net.NetworkCredential(
                                  emailConfig.ClientCredentialUserName, 
                                  emailConfig.ClientCredentialPassword);  
            client.Host = m_HostName;  
            client.Port = 25;  // this is critical
            client.EnableSsl = true;  // this is critical
  
            try  
            {  
                client.Send(message);  
            }  
            catch (Exception e)  
            {  
                Console.WriteLine("Error in Send email: {0}", e.Message);  
                throw;  
            }  
            message.Dispose();  
        }  
  
    }  

    class Program  
    {  
        static void Main(string[] args)  
        {  
            string smtpServer = "smtp-mail.outlook.com";  
            SendEmail(smtpServer);  
        }  
  
        static void SendEmail(string smtpServer)  
        {  
            //Send a High priority Email  
           EmailManager mailMan = new EmailManager(smtpServer);  
  
            EmailSendConfigure myConfig = new EmailSendConfigure(); 
            // replace with your email userName  
            myConfig.ClientCredentialUserName = "abc@outlook.com";
            // replace with your email account password
            myConfig.ClientCredentialPassword = "password!";   
            myConfig.TOs = new string[] { "user1@outlook.com" };  
            myConfig.CCs = new string[] { };  
            myConfig.From = "<YOUR_ACCOUNT>@outlook.com";  
            myConfig.FromDisplayName = "<YOUR_NAME>";  
            myConfig.Priority = System.Net.Mail.MailPriority.Normal;  
            myConfig.Subject = "WebSite was down - please investigate";  
  
            EmailContent myContent = new EmailContent();  
            myContent.Content = "The following URLs were down - 1. Foo, 2. bar";  
  
            mailMan.SendMail(myConfig, myContent);  
        }  
  
    }  
  
    public class EmailSendConfigure  
    {  
        public string[] TOs { get; set; }  
        public string[] CCs { get; set; }  
        public string From { get; set; }  
        public string FromDisplayName { get; set; }  
        public string Subject { get; set; }  
        public MailPriority Priority { get; set; }  
        public string ClientCredentialUserName { get; set; }  
        public string ClientCredentialPassword { get; set; }  
        public EmailSendConfigure()  
        {  
        }  
    }  
  
    public class EmailContent  
    {  
        public bool IsHtml { get; set; }  
        public string Content { get; set; }  
        public string AttachFileName { get; set; }  
    }  
}