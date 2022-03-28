using Framework.Core.Filtering;
using System.Linq.Expressions;

namespace CleanArch.Framework.Core.IGenericRepository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        public IEnumerable<TEntity> Get(
           Expression<Func<TEntity, bool>> filter = null,
           Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
           string includeProperties = "");

        FilterResponse<TEntity> GetFiltered(Expression<Func<TEntity, bool>> predicate, GridRequest request, params string[] Includes);

        public TEntity GetByID(object id);

        public void Insert(TEntity entity);

        public void Delete(object id);

        public void Delete(TEntity entityToDelete);

        public void Update(TEntity entityToUpdate);
    }
}
