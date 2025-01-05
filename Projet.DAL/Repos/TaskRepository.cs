using Microsoft.EntityFrameworkCore;
using Projet.DAL.Contracts;
using Projet.Entities;
using Projet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<ProjectTask> GetByIdAsync(int id)
        {
            return await _context.ProjectTask
                .Include(t => t.AssignedTo) 
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<ProjectTask>> GetTasksByUserIdAsync(int userId)
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
                task.Status = Projet.Entities.TaskStatus.Completed;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProjectTask>> GetAllTasksAsync()
        {
            return await _context.ProjectTask
                .Include(t => t.AssignedTo) 
                .ToListAsync();
        }

        public async Task UpdateAsync(ProjectTask task)
        {
            _context.ProjectTask.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ProjectTask>> GetTasksForUserAsync(int userId)
        {
            return await _context.ProjectTask
                .Where(t => t.AssignedToId == userId)
                .ToListAsync();
        }
    }
}
