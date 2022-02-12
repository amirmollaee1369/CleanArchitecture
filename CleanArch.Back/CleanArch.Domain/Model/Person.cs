using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Domain.Model
{
    public class Person
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateofBirth { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime RegDate { get; set; } = DateTime.Now;
    }
}
