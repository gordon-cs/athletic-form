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
        public List<AthleticConflict> GetAllConflictsByEventId(int eventId) {
            return GetAllConflicts().FindAll(c => c.EventID == eventId);
        }

        private List<AthleticConflict> GetAllConflicts() {
            return _conflictContext.AthleticConflicts.ToList().FindAll
                (e => e.DepartureTime.TimeOfDay <= e.CourseBeginTime.TimeOfDay);
        }      
    }