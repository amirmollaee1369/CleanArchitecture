using CleanArch.Domain.Model;
using CleanArch.Framework.Core.GenericRepository;
using CleanArch.Framework.Core.IGenericRepository;
using CleanArch.Infra.Data.Context;

namespace CleanArch.Infra.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private CleanArchDBContext _context;

        public UnitOfWork(CleanArchDBContext context)
        {
            _context=context;
        }

        #region IGenericRepository
        
        #region Person
        private IGenericRepository<Person>? personRepository;
        public IGenericRepository<Person> PersonRepository
        {
            get
            {
                if (this.personRepository == null)
                {
                    this.personRepository = new GenericRepository<CleanArchDBContext,Person>(_context);
                }
                return personRepository;
            }
        }
        #endregion

        #region Role
        private IGenericRepository<Role>? roleRepository;
        public IGenericRepository<Role> RoleRepository
        {
            get
            {
                if (this.roleRepository == null)
                {
                    this.roleRepository = new GenericRepository<CleanArchDBContext,Role>(_context);
                }
                return roleRepository;
            }
        }
        #endregion
        
        #endregion

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
