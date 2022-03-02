using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;

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
                PhoneNumber = person.PhoneNumber,
                Permissions=person.Permissions,
                //PersonRoles=person.PersonRoles
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
                PhoneNumber = personVM.PhoneNumber,
                Permissions=personVM.Permissions,
                //PersonRoles=personVM.PersonRoles
            };
        }
    }
}
