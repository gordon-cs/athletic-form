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
        [Authorize(Roles = "Scheduler, Admin")]
        public async void Post([FromBody] AthleticEvent athleticEvent)
        {
            await _context.AddAsync<AthleticEvent>(athleticEvent);
            _context.SaveChanges();
            AthleticEvent thisEvent = _context.AthleticEvents.OrderByDescending(x => x.EventId).FirstOrDefault();
            AddAllPlayersToEvent(thisEvent);
        }

        [HttpPut]
        [Route("update/{id}")]
        [Authorize(Roles = "Scheduler, Admin")]
        public void Update(int id, [FromBody] AthleticEvent athleticEvent)
        {
            Console.WriteLine("1");
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
            Console.WriteLine("2");

            // FIXME: "Update" not working initally so this is a work around. Obviously, this
            //         is a sub-ideal solution, but it'll suffice for now
            // HardDelete(eventToUpdate.EventId);
            // Post(eventToUpdate);

            _context.Update(eventToUpdate);

            _context.SaveChanges();
            Console.WriteLine("3");
        }


        /*
            Doesn't Actually Delete.  Just Marks
            as deleted
        */
        [HttpPost]
        [Route("delete/{id}")]
        [Authorize(Roles = "Scheduler, Admin")]
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
        [Authorize(Roles = "Scheduler, Admin")]
        public void Restore(int id)
        {
            AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
            athleticEvent.IsDeleted = false;
            _context.SaveChanges();
        }

        // Actually will delete event from database
        [HttpPost]
        [Route("harddelete/{id}")]
        [Authorize(Roles = "Scheduler, Admin")]
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

