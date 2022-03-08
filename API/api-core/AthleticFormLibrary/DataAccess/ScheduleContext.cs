using AthleticFormLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace AthleticFormLibrary.DataAccess {
    public class ScheduleContext : DbContext { 
        public ScheduleContext(DbContextOptions<ScheduleContext> options)
             : base(options) {}
        public DbSet<SectionSchedules> SectionSchedules { get; set; }


        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<SectionSchedules>(a => a.HasKey(k => k.crs_cde));
        }
    }
}
