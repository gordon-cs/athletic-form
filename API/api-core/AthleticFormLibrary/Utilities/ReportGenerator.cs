using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using System.Collections.Generic;
using System;
using System.Linq;
using AthleticFormLibrary.Models;

namespace AthleticFormLibrary.Utilities
{
    public class ReportGenerator : IReportGeneration
    {
        public const string title = "<h1>Athletic Conflicts</h1>";
        public const string reportDescription = "<p>" +
            "Here is a list of the students who will be missing class this week due to athletic events and " +  
            "their approval status.</p>";
        public const string tableOpeningTag = "<table>";
        public const string tableClosingTag = "</table>";
        public const string tableRowOpeningTag = "<tr>";
        public const string tableRowClosingTag = "</tr>";
        public const string redTableRowOpeningTag = "<tr style='color: red;'>";
        public const string nameHeader = "<th>Name</th>";
        public const string emailHeader = "<th>Email</th>";
        public const string eventHeader = "<th>Event</th>";
        public const string courseCodeHeader = "<th>Course Code</th>";
        public const string conflictHeader = "<th>Conflict?</th>";
        public const string eventDateHeader = "<th>Event Date</th>";
        public const string expectedDepartureHeader = "<th>Expected Departure Time</th>";
        public const string expectedReturnHeader = "<th>Expected Return Time</th>";
        private readonly AthleticContext _context;
        
        public ReportGenerator(AthleticContext context) {
            _context = context;
        }

        //Gets all students with a conflict for a specific class 
        //(Could possibly be merged with GetAllClassConflicts)
        private List<string> GetAllStudentsInClass(string classcode) {
            return new List<string>();
        }

        //Gets all classes where at least one student has a conflict
        private List<string> GetAllClassConflicts(List<AthleticConflict> conflicts) {
            List<string> classConflicts = new List<string>(); //Stores all classes with at least one conflict
            //Check each conflict
            foreach (var conflict in conflicts) {
                AthleticEvent athleticEvent = _context.AthleticEvents.Where(a => a.EventId == conflict.EventID).FirstOrDefault();
                string termCode = YearTermCodeHelper.CalculateTermCode(DateTime.Now);
                string yearCode = YearTermCodeHelper.CalculateYearCode(DateTime.Now);
                var courses = (
                    from a in _context.Accounts
                    join sch in _context.StudentCrsHists on a.Gordon_ID equals sch.ID_NUM.ToString()
                    where a.Email == conflict.Email
                    && sch.YR_CDE == yearCode
                    && sch.TRM_CDE == termCode
                    select new
                    {
                        Gordon_ID = a.Gordon_ID,
                        Nickname = a.Nickname,
                        Firstname = a.FirstName,
                        Lastname = a.LastName,
                        Email = a.Email,
                        CRS_CDE = sch.CRS_CDE,
                        TRM_CDE = sch.TRM_CDE,
                        YR_CDE = sch.YR_CDE
                    }
                ).ToList(); 
                //Check every class involved
                foreach (var course in courses) {
                    AthleticConflict conflictForCourse = _context.AthleticConflicts.Where(c => c.CourseCode == course.CRS_CDE 
                        && c.Email == conflict.Email && c.EventID == conflict.EventID).FirstOrDefault();
                    //If there's a conflict for a student in that class
                    //and we don't already have it in the classConflicts list,
                    //add it
                    if (conflictForCourse != null) {
                        if(!classConflicts.Contains(course.CRS_CDE)) {
                            classConflicts.Add(course.CRS_CDE);
                        }
                    }
                }
            }
            return classConflicts;
        }/**/

        public string GenerateReport(string major, int number = 0)
        {
            string report = title + reportDescription + tableOpeningTag + tableRowOpeningTag +
                nameHeader + emailHeader + eventHeader + eventDateHeader + expectedDepartureHeader + expectedReturnHeader 
                + tableRowClosingTag;
            string termCode = YearTermCodeHelper.CalculateTermCode(DateTime.Now);
            string yearCode = YearTermCodeHelper.CalculateYearCode(DateTime.Now);
            List<AthleticConflict> conflicts = new List<AthleticConflict>();
            if (number == 0)
            {
                conflicts = _context.AthleticConflicts.Where(c => c.CourseCode.StartsWith(major)
                    && c.YearCode == yearCode && c.TermCode == termCode).ToList();
            }
            else
            {
                conflicts = _context.AthleticConflicts.Where(c => c.CourseCode.StartsWith(major)
                    && c.YearCode == yearCode && c.TermCode == termCode).Take(number).ToList();
            }
            foreach (var conflict in conflicts.Select(c => new { c.Email, c.FirstName, c.LastName, c.EventID }).Distinct().ToList()) {
                report += tableRowOpeningTag;
                report += String.Format("<td>{0} {1}</td>", conflict.FirstName, conflict.LastName);
                report += String.Format("<td>{0}</td>", conflict.Email);
                AthleticEvent athleticEvent = _context.AthleticEvents.Where(a => a.EventId == conflict.EventID).FirstOrDefault();
                report += String.Format("<td>{0}: {1}</td>", athleticEvent.Sport, athleticEvent.Opponent);
                report += String.Format("<td>{0}</td>", athleticEvent.EventDate);
                report += String.Format("<td>{0}</td>", athleticEvent.DepartureTime);
                report += String.Format("<td>{0}</td>", athleticEvent.ArrivalTime);
                report += tableRowClosingTag;
            }
            report += tableClosingTag;
            foreach (var conflict in conflicts.Select(c => new { c.Email, c.FirstName, c.LastName, c.EventID }).Distinct().ToList()) {
                report += String.Format("<h2>{0} {1}</h2>", conflict.FirstName, conflict.LastName);
                AthleticEvent athleticEvent = _context.AthleticEvents.Where(a => a.EventId == conflict.EventID).FirstOrDefault();
                report += String.Format("<h3>{0}: {1}</h3>", athleticEvent.Sport, athleticEvent.Opponent);
                report += String.Format("<h3>{0}</h3>", athleticEvent.EventDate);
                report += String.Format("<h4>Leaving on {0} <em>(Expected Departure Time: {1})</em></h4>", 
                    athleticEvent.DepartureTime?.ToString("M/d/yyyy"), athleticEvent.DepartureTime?.ToString("h:mm tt"));
                report += String.Format("<h4>Returning to Campus on {0} <em>(Expected Return Time: {1})</em></h4>",
                    athleticEvent.ArrivalTime?.ToString("M/d/yyyy"), athleticEvent.ArrivalTime?.ToString("h:mm tt"));
                report += tableOpeningTag + tableRowOpeningTag + courseCodeHeader + conflictHeader + tableRowClosingTag;
                var courses = (
                    from a in _context.Accounts
                    join sch in _context.StudentCrsHists on a.Gordon_ID equals sch.ID_NUM.ToString()
                    where a.Email == conflict.Email
                    && sch.YR_CDE == yearCode
                    && sch.TRM_CDE == termCode
                    select new
                    {
                        Gordon_ID = a.Gordon_ID,
                        Nickname = a.Nickname,
                        Firstname = a.FirstName,
                        Lastname = a.LastName,
                        Email = a.Email,
                        CRS_CDE = sch.CRS_CDE,
                        TRM_CDE = sch.TRM_CDE,
                        YR_CDE = sch.YR_CDE
                    }
                ).ToList();
                foreach (var course in courses) {
                    AthleticConflict conflictForCourse = _context.AthleticConflicts.Where(c => c.CourseCode == course.CRS_CDE && c.YearCode == yearCode
                        && c.TermCode == termCode && c.Email == conflict.Email && c.EventID == conflict.EventID).FirstOrDefault();
                    if (conflictForCourse != null) {
                        report += redTableRowOpeningTag;
                        report += String.Format("<td>{0}</td>", course.CRS_CDE);
                        report += "<td>Yes</td>";
                    }
                    else {
                        report += tableRowOpeningTag;
                        report += String.Format("<td>{0}</td>", course.CRS_CDE);
                        report += "<td>No</td>";
                    }
                    report += tableRowClosingTag;
                }
                report += tableClosingTag;
            }
            return report;
        }
    }
}