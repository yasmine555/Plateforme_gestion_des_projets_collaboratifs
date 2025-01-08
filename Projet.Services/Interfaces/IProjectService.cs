using Projet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projet.Services.Interfaces
{
    public interface IProjectService
    {
        Task<Project> CreateProjectAsync(Project project);
        Task<Project> UpdateProjectAsync(int id, Project project);
        Task DeleteProjectAsync(int id);
        Task<Project> GetProjectByIdAsync(int id);
        Task<List<Project>> GetAllProjectsAsync();

    }
}
