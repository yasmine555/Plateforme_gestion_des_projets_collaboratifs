using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.Entities;

namespace Projet.DAL.Contracts
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<Project> CreateProjectAsync(Project project); // M�thode corrig�e
        Task<IEnumerable<Project>> GetAllProjectsAsync(); // Renomm� pour suivre la convention

        Task<Project> GetProjectByIdAsync(int id); // M�thode pour obtenir un projet par ID
        Task<Project> UpdateProjectAsync(Project project); // M�thode de mise � jour
        Task DeleteProjectAsync(int id); // M�thode de suppression
        Task<Project> GetByIdAsync(int id);
        Task<IEnumerable<Project>> GetAllAsync();
        Task AddProjectAsync(Project project);
        void Remove(Project project);
    }
}
