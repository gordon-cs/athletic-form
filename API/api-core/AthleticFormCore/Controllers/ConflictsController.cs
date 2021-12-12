using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.DataAccess;
    [Route("api/[controller]")]
    [ApiController]
    public class ConflictsController : ControllerBase {
        private readonly AthleticContext _conflictContext;

        public ConflictsController(AthleticContext conflictContext) {
            _conflictContext = conflictContext;
        }

        [HttpGet]
        public List<AthleticConflict> GetAll() {
            return GetAllConflicts();
        }

        [HttpGet]
        [Route("{eventId}")]
        public object GetAllConflictsByEventId(int eventId) {
            return GetAllConflicts().FindAll(c => c.EventID == eventId).Select(c => new {c.Email, c.FirstName, c.LastName}).Distinct();
        }

        private List<AthleticConflict> GetAllConflicts() {
            return _conflictContext.AthleticConflicts.ToList().FindAll
                (e => e.DepartureTime.TimeOfDay <= e.CourseBeginTime.TimeOfDay);
        }      
    }