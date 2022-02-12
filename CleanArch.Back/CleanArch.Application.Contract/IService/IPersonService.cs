using CleanArch.Application.Contract.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.Contract.IService
{
    public interface IPersonService
    {
        void Create(PersonViewModel person);
        IEnumerable<PersonViewModel> Read();
        PersonViewModel ReadById(int id);
        void Update(PersonViewModel person);
        void Delete(PersonViewModel person);
    }
}