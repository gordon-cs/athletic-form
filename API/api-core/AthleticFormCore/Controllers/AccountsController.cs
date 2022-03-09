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
        public AccountsController(AthleticContext athleticContext) {
            _athleticContext = athleticContext;
        }

        [HttpGet]
        public List<Account> GetAllAccounts()
        {
            return _athleticContext.Accounts.ToList();
        }

        [HttpGet]
        [Route("StudentsEnrolledIn/{email}")]
        public object GetStudentsEnrolledIn(string email) {
            var enrolledIn = (
                from a in _athleticContext.Accounts
                join sch in _athleticContext.StudentCrsHists on a.Gordon_ID equals sch.ID_NUM.ToString()
                where a.Email == email
                select new { Gordon_ID = a.Gordon_ID, Nickname = a.Nickname, Firstname = a.FirstName, Lastname = a.LastName, 
                    Email = a.Email, CRS_CDE = sch.CRS_CDE }
            );
            return enrolledIn;
        }
    }
}