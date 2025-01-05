using Microsoft.EntityFrameworkCore;
using Projet.Entities;
using System.Linq.Expressions;
using System.Linq;
using Projet.Context;

public class UserRepository : IRepository<User>
{
    private readonly DataContext _context;
    private readonly DbSet<User> _dbSet;

    public UserRepository(DataContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _dbSet = _context.Set<User>();
    }

    public async Task<User?> GetById(object id)
    {
        if (id == null)
            throw new ArgumentNullException(nameof(id));

        return await _dbSet.FindAsync(id); // Méthode asynchrone
    }

    public IEnumerable<User> GetMany(Expression<Func<User, bool>>? predicate = null, params Expression<Func<User, object>>[] includeProperties)
    {
        IQueryable<User> query = _dbSet;

        if (predicate != null)
        {
            query = query.Where(predicate);
        }

        foreach (var includeProperty in includeProperties)
        {
            query = query.Include(includeProperty);
        }

        return query.ToList();
    }

    public void Add(User entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity));

        _dbSet.Add(entity);
    }

    public async Task Update(User entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity));

        _dbSet.Update(entity);
        await _context.SaveChangesAsync(); // Sauvegarde asynchrone
    }

    public void Delete(User entity)
    {
        if (entity == null)
            throw new ArgumentNullException(nameof(entity));

        _dbSet.Remove(entity);
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync(); // Sauvegarde asynchrone
    }
}
