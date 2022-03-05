using System.Security.Claims;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;

namespace CleanArch.Application.Contract.IService
{
    public interface IAuthenticateService
    {
       Task<PersonTokenViewModel> Authenticate(AuthenticateViewModel authenticateViewModel);
    }
}
