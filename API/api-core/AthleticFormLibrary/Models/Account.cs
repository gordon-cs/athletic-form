using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models {
    [Table("AthleticDatabase.Account", Schema ="dbo")]
    public class Account {
        public string Gordon_ID { get; }
        public string NickName { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
    }
}