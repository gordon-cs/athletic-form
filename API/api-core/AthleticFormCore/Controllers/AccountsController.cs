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
        private readonly AccountContext _context;
        public AccountsController(AccountContext context) {
            context = _context;
        }

        [HttpGet]
        public List<Account> getAll() {
            return _context.Accounts.ToList();
        }
    }
}