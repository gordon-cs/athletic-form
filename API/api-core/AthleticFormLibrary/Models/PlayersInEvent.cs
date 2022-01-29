using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("AthleticDatabase.InEvent", Schema="dbo")]
public class PlayersInEvent {
    public string Gordon_ID { get; set; }
    public int EventID { get; set; }

    public PlayersInEvent(string Gordon_ID, int EventID) {
        this.Gordon_ID = Gordon_ID;
        this.EventID = EventID;
    }
}