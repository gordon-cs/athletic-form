using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class AthleticConflictContext : DbContext { 
        public AthleticConflictContext(DbContextOptions<AthleticConflictContext> options)
             : base(options) {}
        public DbSet<AthleticConflict> AthleticConflicts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<AthleticConflict>(e => e.ToView("Conflicts", "dbo")
                .HasKey(t => new { t.EventID, t.Email, t.CourseCode }));
        }
    }
}