using System;

namespace AthleticFormLibrary.Models {
    public class AthleticEvent {
        public int Id {get; set;}
        public string Sport {get; set;}
        public string Opponent {get; set;}
        public DateTime Date {get; set;}
        public string Time { get; set; }
    }
}