using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary;
using AthleticFormLibrary.Interfaces;

namespace AthleticFormCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;

        public EventsController(IDataAccess dataAccess)
        {
           _dataAccess = dataAccess;
        }

        // GET api/events/allEvents
        [HttpGet]
        [Route("allEvents")]
        public string GetAll()
        {
            return _dataAccess.Retrieve();
        }
    }
}
