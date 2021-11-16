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
    public class EventsController : ControllerBase
    {
        private readonly AthleticEventContext _context;
       public EventsController(AthleticEventContext context) {
           _context = context;
       }
        // GET api/events
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
    }
}

