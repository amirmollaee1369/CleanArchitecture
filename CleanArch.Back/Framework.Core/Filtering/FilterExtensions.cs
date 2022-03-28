using System.Linq;
using System.Linq.Dynamic;
using EntityFramework.Extensions;

namespace Framework.Core.Filtering
{
    public static class FilterExtensions
    {
        public static FilterResponse<T> ApplyFilters<T>(this IQueryable<T> query,
            GridRequest request, bool defaultSort = true) where T : class
        {
            if (request.FilterX != null)
                FilterHelper.ProcessFilters(request.FilterX, ref query);

            //if (request.Filter != null && request.Filter.perdict != null)
            //{
            //    var perdict = (Expression<Func<T, bool>>) request.Filter.perdict;

            //    query = query.Where(perdict);
            //}


            if (defaultSort)
            {
                if (request.Sort != null && Enumerable.Any(request.Sort))
                {
                    foreach (var sort in request.Sort)
                    {
                        query = query.OrderBy($"{sort.Field} {sort.Dir}");
                    }
                }
                else
                {
                    var keyId = $@"{typeof(T).Name}Id";
                    query = query.OrderBy(keyId + " desc");
                }
            }
            var count = query.Count();
            var data = query.Skip(request.Skip).Take(request.Take).ToList();

            return new FilterResponse<T>(data, count);
        }
    }
}
