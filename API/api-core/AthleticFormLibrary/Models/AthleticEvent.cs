using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models {
    [Table("AthleticDatabase.AthleticEvents",Schema ="dbo")]
    public class AthleticEvent {
        [Key]
        public string EventId { get; set; }
        public string Sport { get; set; }
        public string Opponent { get; set; }
        public DateTime? EventDate { get; set; }
        public TimeSpan? EventTime { get; set; }
    }
}