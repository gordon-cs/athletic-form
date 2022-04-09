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
    public class EventsController : ControllerBase
    {
        private readonly AthleticContext _context;
        public EventsController(AthleticContext context)
        {
            _context = context;
        }

        [HttpGet]
        public List<AthleticEvent> GetAll()
        {
            return _context.AthleticEvents.ToList();
        }

        [HttpPost]
        [Route("add")]
        [Authorize(Roles = "Scheduler")]
        public async void Post([FromBody] AthleticEvent athleticEvent)
        {
            await _context.AddAsync<AthleticEvent>(athleticEvent);
            _context.SaveChanges();
            AthleticEvent thisEvent = _context.AthleticEvents.OrderByDescending(x => x.EventId).FirstOrDefault();
            AddAllPlayersToEvent(thisEvent);
        }

        [HttpPost]
        [Route("update/{id}")]
        [Authorize(Roles = "Scheduler")]
        public void Update(int id, [FromBody] AthleticEvent athleticEvent)
        {
            AthleticEvent eventToUpdate = _context.AthleticEvents.FirstOrDefault
                (x => x.EventId == id);
            Console.WriteLine(eventToUpdate.Sport);
            eventToUpdate.Sport = athleticEvent.Sport;
            eventToUpdate.Opponent = athleticEvent.Opponent;
            eventToUpdate.EventDate = athleticEvent.EventDate;
            eventToUpdate.HomeOrAway = athleticEvent.HomeOrAway;
            eventToUpdate.DepartureTime = athleticEvent.DepartureTime;
            eventToUpdate.ArrivalTime = athleticEvent.ArrivalTime;
            eventToUpdate.Comments = athleticEvent.Comments;
            eventToUpdate.IsScrimmage = athleticEvent.IsScrimmage;
            _context.Update<AthleticEvent>(eventToUpdate);
            _context.SaveChanges();
        }


        /*
            Doesn't Actually Delete.  Just Marks
            as deleted
        */
        [HttpPost]
        [Route("delete/{id}")]
        [Authorize(Roles = "Scheduler")]
        public void MarkAsDeleted(int id)
        {
            if (ModelState.IsValid)
            {
                AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
                athleticEvent.IsDeleted = true;
                _context.SaveChanges();
            }
        }

        [HttpPost]
        [Route("restore/{id}")]
        [Authorize(Roles = "Scheduler")]
        public void Restore(int id)
        {
            AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
            athleticEvent.IsDeleted = false;
            _context.SaveChanges();
        }

        // Actually will delete event from database
        [HttpPost]
        [Route("harddelete/{id}")]
        [Authorize(Roles = "Scheduler")]
        public void HardDelete(int id)
        {
            AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
            _context.AthleticEvents.Remove(athleticEvent);
            _context.SaveChanges();
        }

        private void AddAllPlayersToEvent(AthleticEvent athleticEvent)
        {
            if (athleticEvent.Sport == String.Empty)
            {
                return;
            }
            var players = _context.PlayersInTeam.Where(x => x.TeamName == athleticEvent.Sport);
            foreach (var player in players)
            {
                _context.Add<PlayersInEvent>
                    (new PlayersInEvent(player.Gordon_ID, athleticEvent.EventId));
            }
            _context.SaveChanges();
        }

    }
}

