using CleanArch.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Domain.IRepository
{
    public interface IPersonRepository
    {
        void Create(Person person);
        Person ReadById(int id);
        public IEnumerable<Person> Read();
        void Update(Person person);
        void Delete(Person person);
    }
}
