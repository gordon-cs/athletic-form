﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.DataAccess;
using System;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AthleticEventContext _context;
       public EventsController(AthleticEventContext context) {
           _context = context;
       }
        
        [HttpGet]
        public List<AthleticEvent> GetAll() {
            return _context.AthleticEvents.ToList();
        }

        [HttpPost]
        [Route("add")]
        public void Post([FromBody]AthleticEvent athleticEvent) {
            _context.Add<AthleticEvent>(athleticEvent);
            _context.SaveChanges();
        }

        [HttpPut]
        [Route("update/{id}")]
        public void Update(int id, [FromBody]AthleticEvent athleticEvent) {
            AthleticEvent eventToUpdate = _context.AthleticEvents.FirstOrDefault
                (x => x.EventId == id);
            if(athleticEvent != null) {
                Console.WriteLine(athleticEvent.Sport);
                Console.WriteLine(athleticEvent.Destination);
                // eventToUpdate.Sport = athleticEvent.Sport;
                // eventToUpdate.Opponent = athleticEvent.Opponent;
                // eventToUpdate.EventDate = athleticEvent.EventDate;
                // eventToUpdate.HomeOrAway = athleticEvent.HomeOrAway;
                // eventToUpdate.DepartureTime = athleticEvent.DepartureTime;
                // _context.Update<AthleticEvent>(athleticEvent);
            }
            _context.SaveChanges();
        }


        /*
            Doesn't Actually Delete.  Just Marks
            as deleted
        */
        [HttpPost]
        [Route("delete/{id}")]
        public void MarkAsDeleted(int id) {
            if (ModelState.IsValid) {
                AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
                athleticEvent.IsDeleted = true;
                _context.SaveChanges();
            }
        }

        [HttpPost]
        [Route("restore/{id}")]
        public void Restore(int id) {
            AthleticEvent athleticEvent = _context.AthleticEvents.Find(id);
            athleticEvent.IsDeleted = false;
            _context.SaveChanges();
        }
    }
}

