using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Domain.Model
{
    public class Person
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; } = string.Empty;
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; } = string.Empty;
        [DataType(DataType.Date)]
        [Required]
        public DateTime DateofBirth { get; set; }
        [DataType(DataType.PhoneNumber)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime RegDate { get; set; } = DateTime.Now;
    }
}
