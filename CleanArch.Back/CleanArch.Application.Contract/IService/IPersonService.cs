using CleanArch.Application.Contract.ViewModels;

namespace CleanArch.Application.Contract.IService
{
    public interface IPersonService : ICRUDService<PersonViewModel>
    {
    }
}