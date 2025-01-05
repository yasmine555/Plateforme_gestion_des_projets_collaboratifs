using Microsoft.EntityFrameworkCore;
using Projet.Context;
using Projet.DAL.Contracts;
using Projet.Entities;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Projet.DAL.Repos
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        private readonly DataContext _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<T>();
        }

        public async Task<T?> GetById(object id)
        {
            if (id == null)
                throw new ArgumentNullException(nameof(id));

            return await _dbSet.FindAsync(id);
        }

        public IEnumerable<T> GetMany(Expression<Func<T, bool>>? predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = _dbSet;

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

        public void Add(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Add(entity);
        }

        public async Task Update(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Update(entity);
            await _context.SaveChangesAsync();  // Sauvegarde asynchrone
        }

        public void Delete(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Remove(entity);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();  // Sauvegarde asynchrone
        }
    }
}
