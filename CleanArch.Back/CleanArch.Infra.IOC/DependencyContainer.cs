using CleanArch.Application.Contract.IService;
using CleanArch.Application.CQRS.PersonCQRS;
using CleanArch.Application.CQRS.RoleCQRS;
using CleanArch.Application.Service;
using CleanArch.Domain.Model;
using CleanArch.Framework.Auth.Permissions;
using CleanArch.Framework.Core.GenericRepository;
using CleanArch.Framework.Core.IGenericRepository;
using CleanArch.Infra.Data.Context;
using CleanArch.Infra.Data.UnitOfWork;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArch.Infra.IOC
{
    public class DependencyContainer
    {
        public static void RegisterDependency(IServiceCollection service)
        {
            service.AddScoped<IGenericRepository<Person>, GenericRepository<CleanArchDBContext,Person>>();
            service.AddScoped<IUnitOfWork, UnitOfWork>();

            #region Services
            service.AddScoped<IPersonService, PersonService>();
            service.AddScoped<IAuthenticateService, AuthenticateService>();
            service.AddSingleton<IAuthorizationPolicyProvider, AuthorizationPolicyProvider>();
            #endregion

            #region MediatR
            service.AddMediatR(typeof(CreatePersonCommand));
            service.AddMediatR(typeof(GetRoleByIdQuery));
            #endregion
        }
    }
}
