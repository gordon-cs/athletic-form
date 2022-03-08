using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.DataAccess;
using System;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AthleticContext _athleticContext;
        private readonly AccountContext _accountContext;
        public AccountsController(AthleticContext athleticContext, AccountContext accountContext) {
            _athleticContext = athleticContext;
            _accountContext = accountContext;
        }

        [HttpGet]
        public List<Account> GetAllAccounts()
        {
            return _accountContext.Accounts.ToList();
        }

        [HttpGet]
        [Route("StudentsEnrolledIn/{email}")]
        public List<StudentsEnrolledIn> GetStudentsEnrolledIn(string email) {
            return _athleticContext.StudentsEnrolledIn.Where(s => s.Email == email).ToList();
        }
    }
}