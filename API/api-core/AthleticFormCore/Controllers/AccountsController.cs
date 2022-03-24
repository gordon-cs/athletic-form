using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.DataAccess;
using System;
using Microsoft.AspNetCore.Authorization;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
    public class AccountsController : ControllerBase
    {
        private readonly AthleticContext _athleticContext;
        public AccountsController(AthleticContext athleticContext)
        {
            _athleticContext = athleticContext;
        }

        [HttpGet]
        public List<Account> GetAllAccounts()
        {
            return _athleticContext.Accounts.ToList();
        }

        [HttpGet]
        [Route("StudentsEnrolledIn/{email}/{yearCode}/{termCode}")]
        public object GetStudentsEnrolledIn(string email, string yearCode, string termCode)
        {
            var enrolledIn = (
                from a in _athleticContext.Accounts
                join sch in _athleticContext.StudentCrsHists on a.Gordon_ID equals sch.ID_NUM.ToString()
                where a.Email == email && sch.YR_CDE == yearCode && sch.TRM_CDE == termCode
                select new
                {
                    Gordon_ID = a.Gordon_ID,
                    Nickname = a.Nickname,
                    Firstname = a.FirstName,
                    Lastname = a.LastName,
                    Email = a.Email,
                    CRS_CDE = sch.CRS_CDE,
                    YR_CDE = sch.YR_CDE,
                    TRM_CDE = sch.TRM_CDE
                }
            );
            return enrolledIn;
        }

        [HttpGet]
        [Route("{email}")]
        public Account GetAccountByEmail(string email)
        {
            return _athleticContext.Accounts.Where(a => a.Email == email).SingleOrDefault();
        }
    }
}