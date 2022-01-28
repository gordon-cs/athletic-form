using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using System.Collections.Generic;
using System;
using System.Linq;

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
        public const string approvalStatusHeader = "<th>Approval Status</th>";
        public const string courseCodeHeader = "<th>Course Code</th>";
        public const string courseTitleHeader = "<th>Course Title</th>";
        public const string daysOfWeekHeader = "<th>Days of Week</th>";
        public const string timeHeader = "<th>Time</th>";
        public const string conflictHeader = "<th>Conflict?</th>";
        private readonly AthleticContext _context;
        public bool Approved { get; set; }
        
        public ReportGenerator(AthleticContext context) {
            _context = context;
        }

        public string GenerateReport(string major)
        {
            string report = title + reportDescription + tableOpeningTag + tableRowOpeningTag + 
                nameHeader + emailHeader + approvalStatusHeader + tableRowClosingTag;
            List<AthleticConflict> conflicts = _context.AthleticConflicts.Where(c => c.CourseCode.StartsWith(major)).ToList();
            foreach (var conflict in conflicts) {
                report += tableRowOpeningTag;
                report += String.Format("<td>{0} {1}</td>", conflict.FirstName, conflict.LastName);
                report += String.Format("<td>{0}</td>", conflict.Email);
                if (Approved) {
                    report += "<td style = 'color: green;'>Approved</td>";
                }
                else {
                    report += "<td style = 'color: red;'>Not Approved</td>";
                }
                report += tableRowClosingTag + tableClosingTag;
                report += String.Format("<h2>{0} {1}</h2>", conflict.FirstName, conflict.LastName);
                report += tableOpeningTag + tableRowOpeningTag + courseCodeHeader + conflictHeader + tableRowClosingTag;
                List<StudentsEnrolledIn> courses = _context.StudentsEnrolledIn.Where(s => s.Email == conflict.Email).ToList();
                foreach (var course in courses) {
                    AthleticConflict conflictForCourse = _context.AthleticConflicts.Where(c => c.CourseCode == course.CRS_CDE).FirstOrDefault();
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