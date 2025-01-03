using System.Linq.Expressions;

namespace Projet.BLL.Contract
{
    public interface IGenericBLL<T> where T : class, new()
    {
        T Add(T entity);
        bool Delete(T entity);

        T GetById(params object[] id);

        IEnumerable<T> GetMany(Expression<Func<T, bool>>? predicate = null, params Expression<Func<T, object>>[] includeProperties);

        void Submit();

        T Update(T entity);

    }
}