using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AthleticFormLibrary.DataAccess;
using Microsoft.AspNetCore.Authorization;
using AthleticFormLibrary.Models;
using AthleticFormLibrary.Utilities;
using System;

[Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Staff")]
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
            AthleticEvent athleticEvent = _conflictContext.AthleticEvents.Where(a => a.EventId == eventId).SingleOrDefault();
            string year = YearTermCodeHelper.CalculateYearCode((DateTime) athleticEvent.EventDate);
            string term = YearTermCodeHelper.CalculateTermCode((DateTime)athleticEvent.EventDate);
            return GetAllConflicts().FindAll(c => c.EventID == eventId).Select(c => new { c.Email, c.FirstName, c.LastName, c.YearCode, c.TermCode })
                .Where(n => n.YearCode == year && n.TermCode == term).Distinct();
        }

        private List<AthleticConflict> GetAllConflicts() {
            return _conflictContext.AthleticConflicts.ToList();
        }      
    }