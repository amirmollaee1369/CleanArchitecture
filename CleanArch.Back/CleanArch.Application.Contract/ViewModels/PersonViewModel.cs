using CleanArch.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.Contract.ViewModels
{
    public class PersonViewModel : BaseViewModel
    {
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
        [DataType(DataType.PhoneNumber)]
        [Required]
        public string PhoneNumber { get; set; } = string.Empty;
        [DataType(DataType.DateTime)]
        [Required]
        public DateTime RegDate { get; set; } = DateTime.Now;

        public string Token { get; set; } = string.Empty;
        public string Permissions { get; set; }

        //Navigation Property
        public List<PersonRole> PersonRoles { get; set; }
    }
}
