using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Models;
    [Route("api/[controller]")]
    [ApiController]
    public class ConflictsController : ControllerBase {
        private readonly AthleticContext _conflictContext;

        public ConflictsController(AthleticContext conflictContext) {
            _conflictContext = conflictContext;
        }

        [HttpGet]
        public List<AthleticConflict> GetAll() {
            return AllConflicts();
        }

        [HttpGet]
        [Route("{eventId}")]
        public List<string> GetAllEmailsByEventId(int eventId) {
            return AllConflicts().Where(c => c.EventID == eventId).
                Select(c => c.Email).Distinct().ToList();
        }

        //Helper function for getting all conflicts
        private List<AthleticConflict> AllConflicts() {
            return _conflictContext.AthleticConflicts.ToList().FindAll
                (e => e.DepartureTime.TimeOfDay <= e.CourseBeginTime.TimeOfDay);
        }      
    }