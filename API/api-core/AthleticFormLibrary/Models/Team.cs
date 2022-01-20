using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AthleticFormLibrary.Models;

[Table("AthleticDatabase.Teams", Schema="dbo")]
public class Team {
   [Key] public string TeamName { get; set; }
    public List<Account> Players { get; set; }
}