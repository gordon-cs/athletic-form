using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AthleticFormLibrary.Models {
    [Table("AthleticDatabase.Account",Schema ="dbo")]
    public class Account {
        public string Gordon_ID;
        public string NickName;
        public string FirstName;
        public string LastName;
        public string Email;
    }
}