using CleanArch.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace CleanArch.Infra.Data.Context
{
    public class CleanArchDBContext : DbContext
    {
        public CleanArchDBContext(DbContextOptions<CleanArchDBContext> options) : base(options)
        {

        }

        public DbSet<Person> ?People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
