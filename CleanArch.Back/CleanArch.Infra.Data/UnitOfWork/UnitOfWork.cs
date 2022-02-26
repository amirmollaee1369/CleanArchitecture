using CleanArch.Domain.Model;
using CleanArch.Framework.Core.IGenericRepository;
using CleanArch.Infra.Data.Context;
using CleanArch.Infra.Data.Repository;

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
