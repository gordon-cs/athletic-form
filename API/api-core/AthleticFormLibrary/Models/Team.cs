using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AthleticFormLibrary.Models;

[Table("Teams", Schema="AthleticAbsence")]
public class Team {
   [Key] public string TeamName { get; set; }
}