using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.Entities;


public interface IProjectRepository
{
    Task<Project> CreateProjectAsync(Project project);
    Task<Project> GetProjectByIdAsync(int id);
    Task<List<Project>> GetAllProjectsAsync();
    Task<Project> UpdateProjectAsync(Project project);
    Task DeleteProjectAsync(int id);
}