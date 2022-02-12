using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Application.Mapper;
using CleanArch.Domain.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.Service
{
    public class PersonService : IPersonService
    {
        public IPersonRepository _personRepository;
        public PersonService(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public void Create(PersonViewModel personVM)
        {
            _personRepository.Create(PersonMapper.PersonViewModelToPerson(personVM));
        }

        public void Delete(PersonViewModel personVM)
        {
            _personRepository.Delete(PersonMapper.PersonViewModelToPerson(personVM));
        }

        public IEnumerable<PersonViewModel> Read()
        {
            return _personRepository.Read().Select(PersonMapper.PersonToPersonViewModel).ToList();
        }
        public PersonViewModel ReadById(int id)
        {
            return PersonMapper.PersonToPersonViewModel(_personRepository.ReadById(id));
        }

        public void Update(PersonViewModel personVM)
        {
            _personRepository.Update(PersonMapper.PersonViewModelToPerson(personVM));
        }
    }
}
