using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.Entities;

namespace Projet.DAL.Contracts
{
    public interface IProjectRepository : IRepository<Project>
    {
        Task<Project> CreateProjectAsync(Project project); // Méthode corrigée
        Task<IEnumerable<Project>> GetAllProjectsAsync(); // Renommé pour suivre la convention

        Task<Project> GetProjectByIdAsync(int id); // Méthode pour obtenir un projet par ID
        Task<Project> UpdateProjectAsync(Project project); // Méthode de mise à jour
        Task DeleteProjectAsync(int id); // Méthode de suppression
        Task<Project> GetByIdAsync(int id);
        Task<IEnumerable<Project>> GetAllAsync();
        Task AddProjectAsync(Project project);
        void Remove(Project project);
    }
}
