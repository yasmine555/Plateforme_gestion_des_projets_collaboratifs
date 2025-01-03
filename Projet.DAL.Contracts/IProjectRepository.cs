using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.Entities;


namespace Projet.DAL.Contracts
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task AddAsync(Project project);
        Task<IEnumerable<Project>> GetAllAsync();

        // Ajoutez des m�thodes sp�cifiques aux projets si n�cessaire
        Task<Project> GetByIdAsync(int id);
        void Remove(Project project);
    }
}
