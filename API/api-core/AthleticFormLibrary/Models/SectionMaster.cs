using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models
{
    [Table("AthleticDatabase.Section_Master", Schema = "dbo")]
    public class SectionMaster
    {
        public string yr_cde { get; set; }
        public string trm_cde { get; set; }
        public string crs_cde { get; set; }
        public int Lead_Instructor_ID { get; set; }
        public string crs_title { get; set; }
        public string sess_cde { get; set; }
    }
}

