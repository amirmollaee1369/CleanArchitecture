using CleanArch.Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.EntityTypeConfiguration
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(p => p.Id);
            
            builder.Property(p => p.Email)
               .IsRequired()
               .IsUnicode();

            builder.Property(p => p.DateofBirth)
                .IsRequired();

            builder.Property(p => p.FirstName)
                .IsRequired();

            builder.Property(p => p.LastName)
                .IsRequired();

            builder.Property(p => p.PhoneNumber)
                .IsRequired();

            builder.Property(p => p.RegDate)
                .IsRequired();
        }
    }
}
