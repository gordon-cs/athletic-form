using AthleticFormLibrary.Interfaces;
using AthleticFormLibrary.DataAccess;
using System.Collections.Generic;
using System;

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
        
        public ReportGenerator(AthleticContext context) {
            _context = context;
        }

        public string GenerateReport(List<DummyStudentData> students)
        {
            string report = title + reportDescription + tableOpeningTag + tableRowOpeningTag + 
                nameHeader + emailHeader + approvalStatusHeader + tableRowClosingTag;
            foreach (var student in students) {
                report += tableRowOpeningTag;
                report += String.Format("<td>{0}</td>", student.Name);
                report += String.Format("<td>{0}</td>", student.Email);
                if (student.Approved) {
                    report += "<td style = 'color: green;'>Approved</td>";
                }
                else {
                    report += "<td style = 'color: red;'>Not Approved</td>";
                }
                report += tableRowClosingTag + tableClosingTag;
                report += String.Format("<h2>{0}</h2>", student.Name);
                report += tableOpeningTag + tableRowOpeningTag + courseCodeHeader + courseTitleHeader + 
                    daysOfWeekHeader + timeHeader + conflictHeader + tableRowClosingTag;
                foreach (var course in student.courses) {
                    if (course.hasConflict) {
                        report += redTableRowOpeningTag;
                        report += String.Format("<td>{0}</td>", course.CourseCode);
                        report += String.Format("<td>{0}</td>", course.CourseTitle);
                        report += String.Format("<td>{0}</td>", course.DaysOfWeek);
                        report += String.Format("<td>{0}</td>", course.Time);
                        report += "<td>Yes</td>";
                    }
                    else {
                        report += tableRowOpeningTag;
                        report += String.Format("<td>{0}</td>", course.CourseCode);
                        report += String.Format("<td>{0}</td>", course.CourseTitle);
                        report += String.Format("<td>{0}</td>", course.DaysOfWeek);
                        report += String.Format("<td>{0}</td>", course.Time);
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