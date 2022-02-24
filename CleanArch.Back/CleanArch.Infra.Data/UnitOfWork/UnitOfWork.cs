using CleanArch.Domain.IRepository;
using CleanArch.Domain.IUnitOfWork;
using CleanArch.Domain.Model;
using CleanArch.Infra.Data.Context;
using CleanArch.Infra.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Infra.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private CleanArchDBContext _context;
        private IGenericRepository<Person> ?personRepository;


        public UnitOfWork(CleanArchDBContext context)
        {
            _context=context;
        }

        public IGenericRepository<Person> PersonRepository
        {
            get
            {
                if (this.personRepository == null)
                {
                    this.personRepository = new GenericRepository<Person>(_context);
                }
                return personRepository;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
