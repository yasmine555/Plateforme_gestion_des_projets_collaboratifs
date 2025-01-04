using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.DAL.Contracts
{
    public interface ITaskRepository
    {
        Task<Task> GetByIdAsync(int id);
        Task<IEnumerable<Task>> GetTasksByUserIdAsync(int userId);
        Task<bool> AssignTaskAsync(int taskId, int userId);
        Task<bool> UpdateProgressAsync(int taskId, int progress);
        Task<IEnumerable<Task>> GetAllTasksAsync();
    }
}