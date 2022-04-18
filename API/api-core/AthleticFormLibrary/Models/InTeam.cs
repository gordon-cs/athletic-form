
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace AthleticFormLibrary.Models
{
    [Table("InTeam", Schema="AthleticAbsence")]
    public class InTeam {
        public string TeamName { get; set; }
        public string Gordon_ID { get; set; }
        public DateTime dateAdded { get; set; }
        public bool IsCoach { get; set; }
        public string CoachTitle { get; set; }
    }
}