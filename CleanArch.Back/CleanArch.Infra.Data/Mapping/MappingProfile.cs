using AutoMapper;
using CleanArch.Application.Contract.ViewModels;
using CleanArch.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            #region Person <> PersonViewModel
            CreateMap<PersonViewModel, Person>().ForMember(c => c.RegDate, opt =>
                opt.MapFrom(_ => DateTime.Now));
            CreateMap<Person, PersonViewModel>();
            #endregion

            #region AuthenticateViewModel <> PersonTokenViewModel
            CreateMap<AuthenticateViewModel, PersonTokenViewModel>().ReverseMap();
            #endregion

        }
    }
}
