using Microsoft.EntityFrameworkCore;
using Projet.DAL.Contracts;
using Projet.Entities;
using System.Linq.Expressions;
using System.Linq;
using System.Threading.Tasks;
using Projet.Context;

namespace Projet.DAL.Repos
{
    public class ProjectRepo : IRepository<Project>
    {
        private readonly DataContext _context;
        private readonly DbSet<Project> _dbSet;

        public ProjectRepo(DataContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = _context.Set<Project>();
        }

        public async Task<Project?> GetById(object id)
        {
            if (id == null)
                throw new ArgumentNullException(nameof(id));

            return await _dbSet.FindAsync(id); // Utilisation de la méthode asynchrone
        }

        public IEnumerable<Project> GetMany(Expression<Func<Project, bool>>? predicate = null, params Expression<Func<Project, object>>[] includeProperties)
        {
            IQueryable<Project> query = _dbSet;

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

        public void Add(Project entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Add(entity);
        }

        public async Task Update(Project entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            _dbSet.Update(entity);
            await _context.SaveChangesAsync(); // Utilisation de SaveChangesAsync pour une mise à jour asynchrone
        }

        public void Delete(Project entity)
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
}
