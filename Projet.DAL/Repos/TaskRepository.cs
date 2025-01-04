using Projet.DAL.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Projet.Context;
using System.Threading.Tasks;

namespace Projet.DAL
{
    public class TaskRepository : ITaskRepository
    {
        private readonly Projet.Context.DataContext _context;

        public TaskRepository(Projet.Context.DataContext context)
        {
            _context = context;
        }

        public async Task<Task> GetByIdAsync(int id)
        {
            return await _context.ProjectTask
                .Include(t => t.AssignedTo)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<Task>> GetTasksByUserIdAsync(int userId)
        {
            return await _context.ProjectTask
                .Where(t => t.AssignedToId == userId)
                .ToListAsync();
        }

        public async Task<bool> AssignTaskAsync(int taskId, int userId)
        {
            var task = await _context.ProjectTask.FindAsync(taskId);
            if (task == null) return false;

            task.AssignedToId = userId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateProgressAsync(int taskId, int progress)
        {
            var task = await _context.ProjectTask.FindAsync(taskId);
            if (task == null) return false;

            task.Progress = Math.Clamp(progress, 0, 100);
            if (progress == 100)
                task.Status = TaskStatus.Completed;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Task>> GetAllTasksAsync()
        {
            return await _context.ProjectTask
                .Include(t => t.AssignedTo)
                .ToListAsync();
        }
    }
}
