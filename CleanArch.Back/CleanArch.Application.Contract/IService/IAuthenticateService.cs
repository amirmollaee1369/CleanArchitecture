using System.Security.Claims;
using CleanArch.Application.Contract.ViewModels;

namespace CleanArch.Application.Contract.IService
{
    public interface IAuthenticateService
    {
        PersonViewModel Authenticate(string username, string password);
    }
}
