using CleanArch.Framework.Core.IGenericRepository;
using Framework.Core.Filtering;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CleanArch.Framework.Core.GenericRepository
{
    public class GenericRepository<TContext, TEntity> : IGenericRepository<TEntity> where TEntity : class where TContext : DbContext
    {
        internal TContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(TContext context)
        {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public FilterResponse<TEntity> GetFiltered(Expression<Func<TEntity, bool>> predicate, GridRequest request, string[] Includes)
        {
            var query = context.Set<TEntity>().AsQueryable();

            if (Includes != null)
                foreach (string include in Includes)
                {
                    query = query.Include(include); //got to reaffect it.
                }
            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return query.ApplyFilters(request);
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual TEntity GetByID(object id)
        {
            return dbSet.Find(id);
        }

        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }

        public virtual void Delete(object id)
        {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            if (context.Entry(entityToDelete).State == EntityState.Detached)
            {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}
