
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models
{
    [Table("AthleticDatabase.InTeam", Schema="dbo")]
    public class PlayersInTeam {
        public string TeamName { get; set; }
        public string Gordon_ID { get; set; }
    }
}