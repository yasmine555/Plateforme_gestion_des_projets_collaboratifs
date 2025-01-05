using System.Linq.Expressions;

public interface IRepository<T> where T : class
{
    Task<T?> GetById(object id);
    IEnumerable<T> GetMany(Expression<Func<T, bool>>? predicate = null, params Expression<Func<T, object>>[] includeProperties);
    void Add(T entity);
    Task Update(T entity); // Mise à jour de void vers Task
    void Delete(T entity);
    Task SaveAsync(); // Pour gérer les transactions asynchrones
}
