using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class AthleticContext : DbContext { 
        public AthleticContext(DbContextOptions<AthleticContext> options)
             : base(options) {}
        public DbSet<AthleticEvent> AthleticEvents { get; set; }
        public DbSet<AthleticConflict> AthleticConflicts { get; set; }
        public DbSet<PlayersInEvent> PlayersInEvent { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<PlayersInTeam> PlayersInTeam { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<SectionSchedules> SectionSchedules { get; set; }
        public DbSet<StudentCrsHist> StudentCrsHists { get; set; }


        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<AthleticConflict>(e => e.ToView("Conflict", "AthleticAbsence")
                .HasKey(t => new { t.EventID, t.Email, t.CourseCode }));
            builder.Entity<PlayersInTeam>(e => e.HasKey(t => new {t.TeamName, t.Gordon_ID}));
            builder.Entity<Account>(a => a.ToTable("Account", "webSQL.dbo").HasKey(k => k.Gordon_ID));
            builder.Entity<PlayersInEvent>(
                e => {
                    e.HasKey(t => new {t.Gordon_ID, t.EventID});
                    e.Property(p => p.Gordon_ID);
                    e.Property(p => p.EventID);
                });
            builder.Entity<SectionSchedules>(a => a.ToTable("SECTION_SCHEDULES", "TmsEPrd.dbo").HasKey(k => k.crs_cde));
            builder.Entity<StudentCrsHist>(e => e.ToTable("STUDENT_CRS_HIST", "TmsEPrd.dbo").HasKey(t => new { t.ID_NUM, t.CRS_CDE }));
        }
    }
}