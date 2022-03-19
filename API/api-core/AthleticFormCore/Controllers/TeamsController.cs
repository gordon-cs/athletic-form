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
    [Authorize(Roles = "Staff, Scheduler")]
    public class TeamsController : ControllerBase
    {
        private readonly AthleticContext _athleticContext;
        public TeamsController(AthleticContext athleticContext)
        {
            _athleticContext = athleticContext;
        }

        [HttpGet]
        public List<Team> GetAllTeams()
        {
            return _athleticContext.Teams.ToList();
        }

    }
}