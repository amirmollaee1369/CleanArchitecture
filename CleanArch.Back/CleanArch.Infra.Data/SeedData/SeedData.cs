using CleanArch.Domain.Model;
using CleanArch.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.SeedData
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context=new CleanArchDBContext(serviceProvider.GetRequiredService<
                    DbContextOptions<CleanArchDBContext>>()))
            {
                #region People Seed Data
                if (context == null || context.People == null)
                {
                    throw new ArgumentNullException("Null CleanArchDBContext");
                }

                // Look for any movies.
                if (context.People.Any())
                {
                    return;   // DB has been seeded
                }

                context.AddRange(new Person()
                {
                    //Id=1,
                    FirstName="Amir",
                    LastName="Mollaee",
                    DateofBirth=DateTime.Now,
                    Email="amir.mollaee1369@gmail.com",
                    PhoneNumber="09154308951",
                    RegDate=DateTime.Now
                });
                context.SaveChanges();
                #endregion

            }
        }
    }
}
