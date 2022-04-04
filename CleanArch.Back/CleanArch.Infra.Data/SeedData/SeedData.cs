using CleanArch.Domain.Model;
using CleanArch.Framework.Auth.Permissions;
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
            using (var context = new CleanArchDBContext(serviceProvider.GetRequiredService<
                    DbContextOptions<CleanArchDBContext>>()))
            {
                
                if (context == null)
                {
                    throw new ArgumentNullException("Null CleanArchDBContext");
                }

                #region People Seed Data
                if (context.People == null)
                {
                    throw new ArgumentNullException("Null CleanArchDBContext");
                }
                else
                {
                    if (!context.People.Any())
                    {

                        context.AddRange(new Person()
                        {
                            //Id=1,
                            FirstName="Amir",
                            LastName="Mollaee",
                            Email="amir.mollaee1369@gmail.com",
                            PhoneNumber="09154308951",
                            Password="123",
                            RegDate=DateTime.Now,
                            Permissions=String.Join(",", new string[] { Permissions.Person.Read, Permissions.Person.Delete, Permissions.Person.Read, Permissions.Person.Update })
                        }, new Person()
                        {
                            //Id=1,
                            FirstName="Ahmad",
                            LastName="MohamadAbadi",
                            Email="ahmad.mohamadabadi@gmail.com",
                            PhoneNumber="09151111111",
                            Password="123",
                            RegDate=DateTime.Now,
                            Permissions=String.Join(",", new string[] { Permissions.Person.Read })
                        }, new Person()
                        {
                            //Id=1,
                            FirstName = "Ali",
                            LastName = "Yosefi",
                            Email = "Ali.Yosefi@gmail.com",
                            PhoneNumber = "09152222222",
                            Password = "123",
                            RegDate = DateTime.Now,
                            Permissions = String.Join(",", new string[] { Permissions.Person.Read })
                        }, new Person()
                        {
                            //Id=1,
                            FirstName = "Mahdi",
                            LastName = "Hamedi",
                            Email = "Mahdi.Hamdei@gmail.com",
                            PhoneNumber = "09153333333",
                            Password = "123",
                            RegDate = DateTime.Now,
                            Permissions = String.Join(",", new string[] { Permissions.Person.Read })
                        }, new Person()
                        {
                            //Id=1,
                            FirstName = "Ali",
                            LastName = "Soleymani",
                            Email = "Ali.Soleymani@gmail.com",
                            PhoneNumber = "09154444444",
                            Password = "123",
                            RegDate = DateTime.Now,
                            Permissions = String.Join(",", new string[] { Permissions.Person.Read })
                        }, new Person()
                        {
                            //Id=1,
                            FirstName = "Hadi",
                            LastName = "ghasemi",
                            Email = "Hadi.Ghasemi@gmail.com",
                            PhoneNumber = "09155555555",
                            Password = "123",
                            RegDate = DateTime.Now,
                            Permissions = String.Join(",", new string[] { Permissions.Person.Read })
                        });
                        context.SaveChanges();
                    }
                }
                #endregion

                #region Roles Seed Data
                if (context.Roles == null)
                {
                    throw new ArgumentNullException("Null CleanArchDBContext");
                }
                else
                {
                    if (!context.Roles.Any())
                    {

                        context.AddRange(new Role()
                        {
                            //Id=1,
                            Name="Admin",
                            Permissions=String.Join(",", new string[] { Permissions.Person.Create, Permissions.Person.Delete, Permissions.Person.Read, Permissions.Person.Update })
                        },
                        new Role()
                        {
                            //Id=1,
                            Name="Person",
                            Permissions=String.Join(",", new string[] {  Permissions.Person.Update})
                        });
                        context.SaveChanges();
                    }
                }
                #endregion

               
            }
        }
    }
}
