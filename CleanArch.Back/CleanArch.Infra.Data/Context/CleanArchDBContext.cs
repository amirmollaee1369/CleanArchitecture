using CleanArch.Domain.Model;
using CleanArch.Infra.Data.EntityTypeConfiguration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.Context
{
    public class CleanArchDBContext : DbContext
    {
        public CleanArchDBContext(DbContextOptions<CleanArchDBContext> options) : base(options)
        {

        }

        public DbSet<Person> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Entity Configuration
            modelBuilder.ApplyConfiguration<Person>(new PersonConfiguration());
            #endregion

            #region Seed Data
            modelBuilder.Entity<Person>().HasData(new Person()
            {
                Id=1,
                FirstName="Amir",
                LastName="Mollaee",
                DateofBirth=DateTime.Now,
                Email="amir.mollaee1369@gmail.com",
                PhoneNumber="09154308951",
                RegDate=DateTime.Now
            });
            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
