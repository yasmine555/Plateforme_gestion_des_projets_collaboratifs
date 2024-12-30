using System.Collections.Generic;
using System.Threading.Tasks;

public interface IProjectService
{
    Task<ProjectDTO> CreateProjectAsync(ProjectDTO project);
    Task<ProjectDTO> UpdateProjectAsync(int id, ProjectDTO project);
    Task DeleteProjectAsync(int id);
    Task<ProjectDTO> GetProjectByIdAsync(int id);
    Task<List<ProjectDTO>> GetAllProjectsAsync();
    Task<ProjectDTO> AddObjectiveAsync(int projectId, ProjectObjectiveDTO objective);
    Task<ProjectDTO> AddDeliverableAsync(int projectId, DeliverableDTO deliverable);
}