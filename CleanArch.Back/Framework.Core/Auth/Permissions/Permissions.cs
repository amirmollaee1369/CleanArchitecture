using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CleanArch.Framework.Auth.Permissions
{
    public static class Permissions
    {
        public static string Permission = "Permissions";

        public static class Person
        {
            public const string Create = "Permissions.Person.Create";
            public const string Read = "Permissions.Person.Read";
            public const string Update = "Permissions.Person.Update";
            public const string Delete = "Permissions.Person.Delete";
        }
    }
}