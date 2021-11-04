using System;

namespace AthleticFormLibrary.Models {
    public class AthleticEvent {
        public string Sport {get; set;}
        public string Opponent {get; set;}
        public DateTime Date {get; set;}
        public  TimeSpan Time { get; set; }
    }
}