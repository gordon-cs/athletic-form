using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Interfaces;
using System.Collections.Generic;
using System.Net.Mail;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase {
        private readonly IEmailer _mailer;
        public EmailController(IEmailer mailer) {
            _mailer = mailer;
        }

        [HttpPost]
        [Route("{fromEmail}/{password}/{emails}/{number}/")]
        public void SendMail(string fromEmail, string password, string emails, int number) {
            _mailer.WeeklyMail(fromEmail, password, emails, number);
        }
    }
}