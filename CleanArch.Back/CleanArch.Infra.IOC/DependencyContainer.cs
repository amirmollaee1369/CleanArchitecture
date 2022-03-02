using CleanArch.Application.Contract.IService;
using CleanArch.Application.Service;
using CleanArch.Domain.Model;
using CleanArch.Framework.Auth.Permissions;
using CleanArch.Framework.Core.IGenericRepository;
using CleanArch.Infra.Data.Repository;
using CleanArch.Infra.Data.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArch.Infra.IOC
{
    public class DependencyContainer
    {
        public static void RegisterDependency(IServiceCollection service)
        {
            service.AddScoped<IGenericRepository<Person>, GenericRepository<Person>>();
            service.AddScoped<IUnitOfWork, UnitOfWork>();

            #region Services
            service.AddScoped<IPersonService, PersonService>();
            service.AddScoped<IAuthenticateService, AuthenticateService>();
            service.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
            #endregion
        }
    }
}
