using Projet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projet.DAL.Contracts
{
    public interface ITaskRepository
    {
        Task<ProjectTask> GetByIdAsync(int id);
        Task<IEnumerable<ProjectTask>> GetTasksByUserIdAsync(int userId);
        Task<bool> AssignTaskAsync(int taskId, int userId);
        Task<bool> UpdateProgressAsync(int taskId, int progress);
        Task<IEnumerable<ProjectTask>> GetAllTasksAsync();
        Task<List<ProjectTask>> GetTasksForUserAsync(int userId);
        Task UpdateAsync(ProjectTask task);
    }
}
