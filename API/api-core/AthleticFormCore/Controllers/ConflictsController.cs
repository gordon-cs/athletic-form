using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.DataAccess;
using AthleticFormLibrary.Models;


    [Route("api/[controller]")]
    [ApiController]
    public class ConflictsController : ControllerBase {
        private readonly AthleticConflictContext _conflictContext;

        public ConflictsController(AthleticConflictContext conflictContext) {
            _conflictContext = conflictContext;
        }

        [HttpGet]
        public List<AthleticConflict> GetAll() {
            return _conflictContext.AthleticConflicts
                    .ToList().FindAll(e => e.DepartureTime.TimeOfDay <= e.CourseBeginTime.TimeOfDay);
        }       
    }