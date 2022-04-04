
using Framework.Core.Filtering;

namespace CleanArch.Application.Contract.IService
{
    public interface ICRUDService<TResult> where TResult : class
    {
        void Create(TResult result);
        IEnumerable<TResult> Read();
        FilterResponse<TResult> Read(GridRequest gridRequest);
        TResult ReadById(int id);
        void Update(TResult result);
        void Delete(TResult result);
        void Delete(int id);
    }
}