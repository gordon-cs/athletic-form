using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Interfaces;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text.Json;

namespace AthleticFormCore.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase {
        private readonly IEmailer _mailer;
        public EmailController(IEmailer mailer) {
            _mailer = mailer;
        }

        [HttpGet]
        [Route("{fromEmail}/{password}/{emails}/{number}/")]
        public List<DisplayedMessage> SendMail(string fromEmail, string password, string emails, int number) {
            List<DisplayedMessage> displayedMessages = new List<DisplayedMessage>();
            var messages = _mailer.WeeklyMail(fromEmail, password, emails, number);
            foreach (var message in messages) {
                DisplayedMessage displayed = new DisplayedMessage();
                displayed.fromEmail = message.From;
                displayed.toEmails = new List<MailAddress>();
                foreach (var toAddress in message.To) {
                    displayed.toEmails.Add(toAddress);
                }
                displayed.subject = message.Subject;
                displayed.body = message.Body;
                displayed.isBodyHtml = message.IsBodyHtml;
                displayedMessages.Add(displayed);
            }
            return displayedMessages;
        }
    }

    public class DisplayedMessage {
        public MailAddress fromEmail { get; set; }
        public List<MailAddress> toEmails { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
        public bool isBodyHtml { get; set; }
    }
}