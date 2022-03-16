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
        public const string approvalStatusHeader = "<th>Approval Status</th>";
        public const string courseCodeHeader = "<th>Course Code</th>";
        public const string conflictHeader = "<th>Conflict?</th>";
        private readonly AthleticContext _context;
        public bool Approved { get; set; }
        
        public ReportGenerator(AthleticContext context) {
            _context = context;
        }

        public string GenerateReport(string major, int number = 0)
        {
            string report = title + reportDescription + tableOpeningTag + tableRowOpeningTag +
                nameHeader + emailHeader + eventHeader + approvalStatusHeader + tableRowClosingTag;
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
                if (Approved) {
                    report += "<td style = 'color: green;'>Approved</td>";
                }
                else {
                    report += "<td style = 'color: red;'>Not Approved</td>";
                }
                report += tableRowClosingTag;
            }
            report += tableClosingTag;
            foreach (var conflict in conflicts.Select(c => new { c.Email, c.FirstName, c.LastName, c.EventID }).Distinct().ToList()) {
                report += String.Format("<h2>{0} {1}</h2>", conflict.FirstName, conflict.LastName);
                AthleticEvent athleticEvent = _context.AthleticEvents.Where(a => a.EventId == conflict.EventID).FirstOrDefault();
                report += String.Format("<h3>{0}: {1}</h3>", athleticEvent.Sport, athleticEvent.Opponent);
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