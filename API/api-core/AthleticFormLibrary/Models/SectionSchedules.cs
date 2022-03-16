using System;

namespace AthleticFormLibrary.Models
{
    public class SectionSchedules
    {
        public string yr_cde { get; set; }
        public string trm_cde { get; set; }
        public string crs_cde { get; set; }
        public char MONDAY_CDE { get; set; }
        public char TUESDAY_CDE { get; set; }
        public char WEDNESDAY_CDE { get; set; }
        public char THURSDAY_CDE { get; set; }
        public char FRIDAY_CDE { get; set; }
        public char SATURDAY_CDE { get; set; }
        public char SUNDAY_CDE { get; set; }
        public DateTime BEGIN_TIM { get; set; }
        public DateTime END_TIM { get; set; }
        public int PROFESSOR_ID_NUM { get; set; }
    }
}

