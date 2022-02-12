using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.Mapper
{
    public class PersonMapper
    {
        public static PersonViewModel PersonToPersonViewModel(Person person)
        {
            return new PersonViewModel()
            {
                Id = person.Id,
                Email = person.Email,
                FirstName = person.FirstName,
                LastName = person.LastName,
                DateofBirth = person.DateofBirth,
                PhoneNumber = person.PhoneNumber
            };
        }

        public static Person PersonViewModelToPerson(PersonViewModel personVM)
        {
            return new Person()
            {
                Id = personVM.Id,
                Email = personVM.Email,
                FirstName = personVM.FirstName,
                LastName = personVM.LastName,
                DateofBirth = personVM.DateofBirth,
                PhoneNumber = personVM.PhoneNumber,
            };
        }
    }
}
