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
    [Authorize(Roles = "Staff, Scheduler, Admin")]
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
                where pit.TeamName == sport && !pit.IsCoach
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

        [HttpGet]
        [Route("{sport}/coaches")]
        public object GetCoachRosterData(string sport)
        {
            var rosterData = (
                from a in _athleticContext.Accounts
                join pit in _athleticContext.PlayersInTeam on a.Gordon_ID equals pit.Gordon_ID
                where pit.TeamName == sport && pit.IsCoach
                select new
                {
                    Gordon_ID = a.Gordon_ID,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email,
                    CoachTitle = pit.CoachTitle
                }
            );
            return rosterData;
        }

        [HttpGet]
        [Route("{username}/coaches")]
        public Boolean IsCoach(string username)
        {
            // Retrieve the user's Gordon ID to use in our query
            var email = username + "@gordon.edu";
            var gordonId = _athleticContext.Accounts.Where(a => a.Email == email).SingleOrDefault().Gordon_ID;
            
            var rosterData = (
                from a in _athleticContext.Accounts
                join pit in _athleticContext.PlayersInTeam on a.Gordon_ID equals pit.Gordon_ID
                where pit.IsCoach && pit.Gordon_ID == gordonId
                select new
                {
                    Gordon_ID = a.Gordon_ID,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email,
                    CoachTitle = pit.CoachTitle
                }
            );

            return rosterData != null;
        }

        [HttpPost]
        [Route("add")]
        public async void AddToTeamRoster([FromBody] InTeam playerInTeam)
        {
            playerInTeam.dateAdded = DateTime.Now;
            playerInTeam.IsCoach = false;
            await _athleticContext.AddAsync<InTeam>(playerInTeam);
            _athleticContext.SaveChanges();
            InTeam thisPlayer = _athleticContext.PlayersInTeam.OrderByDescending(p => p.dateAdded).FirstOrDefault();
            addPlayerToEvents(thisPlayer);
        }

        [HttpPost]
        [Route("addcoach")]
        public async void AddCoachToRoster([FromBody] InTeam coach)
        {
            coach.dateAdded = DateTime.Now;
            coach.IsCoach = true;
            await _athleticContext.AddAsync<InTeam>(coach);
            _athleticContext.SaveChanges();

        }

        [HttpPost]
        [Route("{sport}/delete/{gordonId}")]
        public void DeleteFromTeamRoster(string sport, string gordonId)
        {
            InTeam playerToDelete = _athleticContext.PlayersInTeam.Where(pit => pit.TeamName == sport && pit.Gordon_ID == gordonId).SingleOrDefault();
            deletePlayerFromEvents(playerToDelete);
            _athleticContext.PlayersInTeam.Remove(playerToDelete);
            _athleticContext.SaveChanges();
        }

        [HttpPost]
        [Route("{sport}/deletecoach/{gordonId}")]
        public void DeleteCoachFromTeamRoster(string sport, string gordonId)
        {
            InTeam coachToDelete = _athleticContext.PlayersInTeam.Where(pit => pit.TeamName == sport && pit.Gordon_ID == gordonId).SingleOrDefault();
            _athleticContext.PlayersInTeam.Remove(coachToDelete);
            _athleticContext.SaveChanges();
        }

        private void addPlayerToEvents(InTeam playerInTeam)
        {
            List<AthleticEvent> athleticEvents = _athleticContext.AthleticEvents.Where(a => a.Sport == playerInTeam.TeamName).ToList();
            foreach (var athleticEvent in athleticEvents)
            {
                _athleticContext.Add<PlayersInEvent>(
                    new PlayersInEvent(playerInTeam.Gordon_ID, athleticEvent.EventId));
            }
            _athleticContext.SaveChanges();
        }

        private void deletePlayerFromEvents(InTeam playerInTeam)
        {
            List<AthleticEvent> athleticEvents = _athleticContext.AthleticEvents.Where(a => a.Sport == playerInTeam.TeamName).ToList();
            foreach (var athleticEvent in athleticEvents)
            {
                _athleticContext.Remove<PlayersInEvent>(
                    new PlayersInEvent(playerInTeam.Gordon_ID, athleticEvent.EventId));
            }
            _athleticContext.SaveChanges();
        }
    }
}