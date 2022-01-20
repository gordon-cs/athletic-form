using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models {
    [Table("AthleticDatabase.AthleticEvents",Schema ="dbo")]
    public class AthleticEvent {
        [Key]
        public int EventId { get; set; }
        public string Sport { get; set; }
        public string Opponent { get; set; }
        public string HomeOrAway {get; set; }
        public string Destination { get; set; }
        public DateTime? EventDate { get; set; }
        public DateTime? DepartureTime { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? ArrivalTime { get; set; }
        public string Comments { get; set; }
        public bool IsScrimmage { get; set; }
    }
}