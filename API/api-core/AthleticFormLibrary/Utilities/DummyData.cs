using System.Collections.Generic;

namespace AthleticFormLibrary.Utilities {
    public class DummyStudentData {
        public string Name { get; set;}
        public string Email { get; set; }
        public bool Approved { get; set; }
        public List<DummyCourseData> courses { get; set; }
    }

    public class DummyCourseData {
        public string CourseCode { get; set; }
        public string CourseTitle { get; set; }
        public string DaysOfWeek { get; set; }
        public string Time { get; set; }
        public bool hasConflict { get; set; }
    }
}