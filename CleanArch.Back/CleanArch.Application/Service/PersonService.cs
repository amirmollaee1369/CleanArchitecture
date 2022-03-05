using AutoMapper;
using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using CleanArch.Infra.Data.UnitOfWork;
using System.Linq.Expressions;

namespace CleanArch.Application.Service
{
    public class PersonService : IPersonService
    {
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PersonService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork=unitOfWork;
            _mapper=mapper;
        }

        public void Create(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Insert(_mapper.Map<PersonViewModel, Person>(personVM));
        }

        public void Delete(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Delete(_mapper.Map<PersonViewModel, Person>(personVM));
        }

        public IEnumerable<PersonViewModel> Read()
        {
            return _unitOfWork.PersonRepository.Get().Select(person => _mapper.Map<Person, PersonViewModel>(person)).ToList();
        }

        public PersonViewModel ReadById(int id)
        {
            return _mapper.Map<Person, PersonViewModel>(_unitOfWork.PersonRepository.GetByID(id));
        }

        public void Update(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Update(_mapper.Map<PersonViewModel, Person>(personVM));
        }
    }
}
