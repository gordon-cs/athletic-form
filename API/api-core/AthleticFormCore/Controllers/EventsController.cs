using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary;
using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.DataAccess;
using Microsoft.EntityFrameworkCore;

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
    }
}
