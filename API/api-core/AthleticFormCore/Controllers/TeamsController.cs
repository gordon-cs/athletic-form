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

        [HttpGet]
        [Route("{sport}")]
        public object GetRosterData(string sport)
        {
            var rosterData = (
                from a in _athleticContext.Accounts 
                join pit in _athleticContext.PlayersInTeam on a.Gordon_ID equals pit.Gordon_ID
                where pit.TeamName == sport
                select new
                {
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email
                }
            );
            return rosterData;
        }
    }
}