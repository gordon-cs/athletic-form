using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class AthleticContext : DbContext { 
        public AthleticContext(DbContextOptions<AthleticContext> options)
             : base(options) {}
        public DbSet<AthleticEvent> AthleticEvents { get; set; }
        public DbSet<AthleticConflict> AthleticConflicts { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<StudentsEnrolledIn> StudentsEnrolledIn { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<AthleticConflict>(e => e.ToView("Conflicts", "dbo")
                .HasKey(t => new { t.EventID, t.Email, t.CourseCode }));
            builder.Entity<Account>(a => a.HasKey(k => k.Gordon_ID));
            builder.Entity<StudentsEnrolledIn>(e => e.ToView("StudentsEnrolledIn", "dbo")
                .HasKey(t => new { t.Email, t.crs_cde }));
        }
    }
}