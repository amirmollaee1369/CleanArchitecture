using CleanArch.Application.Contract.IService;
using CleanArch.Application.Service;
using CleanArch.Domain.Model;
using CleanArch.Framework.Core.IGenericRepository;
using CleanArch.Infra.Data.Repository;
using CleanArch.Infra.Data.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArch.Infra.IOC
{
    public class DependencyContainer
    {
        public static void RegisterDependency(IServiceCollection service)
        {
            //Application Layer
            service.AddScoped<IGenericRepository<Person>, GenericRepository<Person>>();
            service.AddScoped<IUnitOfWork, UnitOfWork>();
            service.AddScoped<IPersonService, PersonService>();
        }
    }
}
