namespace CleanArch.Application.Contract.IService
{
    public interface ICRUDService<TResult> where TResult : class
    {
        void Create(TResult result);
        IEnumerable<TResult> Read();
        TResult ReadById(int id);
        void Update(TResult result);
        void Delete(TResult result);
    }
}