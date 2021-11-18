using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class AthleticEventContext : DbContext { 
        public AthleticEventContext(DbContextOptions options) : base(options) {}
        public DbSet<AthleticEvent> AthleticEvents { get; set; }
    }
}