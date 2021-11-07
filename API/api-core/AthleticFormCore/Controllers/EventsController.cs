using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary;
using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.Models;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        private List<AthleticEvent> _events;
        public EventsController(IDataAccess dataAccess)
        {
           _dataAccess = dataAccess;
           _events = new List<AthleticEvent>();
        }

        // GET api/events
        [HttpGet]
        public List<AthleticEvent> GetAll()
        {
            _events.Add(new AthleticEvent {
                Opponent = "Endicott",
                Sport = "Baseball",
                Date = DateTime.Now,
                Time = DateTime.Now.TimeOfDay
            }); 
            return _events;
        }
    }
}
