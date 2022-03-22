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
                    Gordon_ID = a.Gordon_ID,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email
                }
            );
            return rosterData;
        }

        [HttpPost]
        [Route("add")]
        public void AddToTeamRoster([FromBody]PlayersInTeam playerInTeam)
        {
            _athleticContext.Add<PlayersInTeam>(playerInTeam);
            _athleticContext.SaveChanges();
        }

        [HttpPost]
        [Route("{sport}/delete/{gordonId}")]
        public void DeleteFromTeamRoster(string sport, string gordonId)
        {
            PlayersInTeam playerToDelete = _athleticContext.PlayersInTeam.Where(pit => pit.TeamName == sport && pit.Gordon_ID == gordonId).SingleOrDefault();
            _athleticContext.PlayersInTeam.Remove(playerToDelete);
            _athleticContext.SaveChanges();
        }
    }
}