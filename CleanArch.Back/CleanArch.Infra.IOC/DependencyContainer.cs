using CleanArch.Application.Contract.IService;
using CleanArch.Application.Service;
using CleanArch.Domain.IRepository;
using CleanArch.Infra.Data.Repository;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.IOC
{
    public class DependencyContainer
    {
        public static void RegisterDependency(IServiceCollection service)
        {            
            //Application Layer
            service.AddScoped<IPersonService, PersonService>();

            //Infra Data Layer
            service.AddScoped<IPersonRepository, PersonRepository>();
        }
    }
}
