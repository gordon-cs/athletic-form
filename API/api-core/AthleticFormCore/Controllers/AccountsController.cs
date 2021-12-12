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
        private readonly AthleticContext _context;
        public AccountsController(AthleticContext context) {
            _context = context;
        }

        [HttpGet]
        public List<Account> GetAll() {
            return _context.Accounts.ToList();
        }


        [HttpGet]
        [Route("StudentsEnrolledIn/{email}")]
        public List<StudentsEnrolledIn> GetStudentsEnrolledIn(string email) {
            return _context.StudentsEnrolledIn.Where(s => s.Email == email).ToList();
        }
    }
}