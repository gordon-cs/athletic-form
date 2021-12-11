using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class AccountContext : DbContext { 
        public AccountContext(DbContextOptions<AccountContext> options)
             : base(options) {}
        public DbSet<Account> Accounts { get; set; }
    }
}