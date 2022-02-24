using CleanArch.Domain.IRepository;
using CleanArch.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Domain.IUnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public IGenericRepository<Person> PersonRepository { get; }

        void Save();
    }
}
