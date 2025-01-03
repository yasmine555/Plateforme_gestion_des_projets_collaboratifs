using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.Entities;


namespace Projet.DAL.Contracts
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task AddAsync(Project project);
        Task<IEnumerable<Project>> GetAllAsync();

        // Ajoutez des méthodes spécifiques aux projets si nécessaire
        Task<Project> GetByIdAsync(int id);
        void Remove(Project project);
    }
}
