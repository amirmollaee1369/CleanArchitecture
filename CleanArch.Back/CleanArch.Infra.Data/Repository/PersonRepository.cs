using CleanArch.Domain.IRepository;
using CleanArch.Domain.Model;
using CleanArch.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private CleanArchDBContext _DBContext;
        public PersonRepository(CleanArchDBContext DBContext)
        {
            _DBContext = DBContext;
        }

        public void Create(Person person)
        {
            _DBContext.People.Add(person);
            _DBContext.SaveChanges();
        }

        public void Delete(Person person)
        {
            _DBContext.People.Remove(person);
            _DBContext.SaveChanges();
        }

        public IEnumerable<Person> Read()
        {
            return _DBContext.People.ToList();
        }

        public Person ReadById(int id)
        {
            return _DBContext.People.Find(id);
        }

        public void Update(Person person)
        {
            _DBContext.People.Update(person);
            _DBContext.SaveChanges();
        }
    }
}
