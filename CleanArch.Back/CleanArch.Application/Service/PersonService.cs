using CleanArch.Application.Contract.IService;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Application.Mapper;
using CleanArch.Infra.Data.UnitOfWork;

namespace CleanArch.Application.Service
{
    public class PersonService : IPersonService
    {
        private IUnitOfWork _unitOfWork;

        public PersonService(IUnitOfWork unitOfWork)
        {
            _unitOfWork=unitOfWork;
        }

        public void Create(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Insert(PersonMapper.PersonViewModelToPerson(personVM));
        }

        public void Delete(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Delete(PersonMapper.PersonViewModelToPerson(personVM));
        }

        public IEnumerable<PersonViewModel> Read()
        {
            return _unitOfWork.PersonRepository.Get().Select(PersonMapper.PersonToPersonViewModel).ToList();
        }
        public PersonViewModel ReadById(int id)
        {
            return PersonMapper.PersonToPersonViewModel(_unitOfWork.PersonRepository.GetByID(id));
        }

        public void Update(PersonViewModel personVM)
        {
            _unitOfWork.PersonRepository.Update(PersonMapper.PersonViewModelToPerson(personVM));
        }
    }
}
