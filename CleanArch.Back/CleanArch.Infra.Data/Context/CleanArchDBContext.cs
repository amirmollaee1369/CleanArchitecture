using CleanArch.Domain.Model;
using Microsoft.EntityFrameworkCore;
using CleanArch.Infra.Data.SeedData;
namespace CleanArch.Infra.Data.Context
{
    public class CleanArchDBContext : DbContext
    {
        public CleanArchDBContext(DbContextOptions<CleanArchDBContext> options) : base(options)
        {

        }

        public DbSet<Person>? People { get; set; }
        public DbSet<Role>? Roles { get; set; }
        public DbSet<PersonRole>? PersonRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PersonRole>()
            .HasKey(t => new { t.PersonId, t.RoleId });

            modelBuilder.Entity<PersonRole>()
                .HasOne(pt => pt.Person)
                .WithMany(p => p.PersonRoles)
                .HasForeignKey(pt => pt.PersonId);

            modelBuilder.Entity<PersonRole>()
                .HasOne(pt => pt.Role)
                .WithMany(t => t.PersonRoles)
                .HasForeignKey(pt => pt.RoleId);


            base.OnModelCreating(modelBuilder);
        }
    }
}
