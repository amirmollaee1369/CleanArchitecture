using CleanArch.Domain.Model;
using CleanArch.Framework.Core.IGenericRepository;

namespace CleanArch.Infra.Data.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        public IGenericRepository<Person> PersonRepository { get; }
        public IGenericRepository<Role> RoleRepository { get; }

        void Save();
    }
}
