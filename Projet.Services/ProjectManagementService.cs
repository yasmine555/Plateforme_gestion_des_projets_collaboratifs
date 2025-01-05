using Projet.Services.Interfaces;
using Projet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Projet.DAL.Contracts;

namespace Projet.Services
{
    public class ProjectManagementService : IProjectManagementService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IRepository<User> _userRepository; // Spécification du type générique

        public ProjectManagementService(ITaskRepository taskRepository, IRepository<User> userRepository)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
        }

        // Méthode pour assigner une tâche à un membre
        public async Task<bool> AssignTaskToMember(int taskId, int userId, int currentUserId)
        {
            var user = await _userRepository.GetById(userId);
            if (user == null || user.Id != currentUserId)
            {
                return false; // Unauthorized
            }

            var task = await _taskRepository.GetByIdAsync(taskId);
            if (task == null)
            {
                return false; // Task not found
            }

            task.AssignedToId = userId;
            await _taskRepository.UpdateAsync(task);
            return true;
        }

        // Méthode pour mettre à jour la progression d'une tâche
        public async Task<bool> UpdateTaskProgress(int taskId, int progress, int currentUserId)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);
            if (task == null)
            {
                return false; // Task not found
            }

            task.Progress = progress;
            await _taskRepository.UpdateAsync(task);
            return true;
        }

        // Méthode pour attribuer un badge à un utilisateur
        public async Task<bool> AwardBadge(int userId, string badgeName, int currentUserId)
        {
            var user = await _userRepository.GetById(userId);
            if (user == null || user.Id != currentUserId)
            {
                return false; // Unauthorized
            }

            user.Badges.Add(badgeName);
            await _userRepository.Update(user); // Mise à jour asynchrone
            return true;
        }


        // Méthode pour récupérer les progrès de l'équipe
        public async Task<List<TaskProgressReport>> GetTeamProgress(int currentUserId)
        {
            var tasks = await _taskRepository.GetTasksForUserAsync(currentUserId);
            var progressReports = new List<TaskProgressReport>();

            foreach (var task in tasks)
            {
                var report = new TaskProgressReport
                {
                    TaskId = task.Id,
                    TaskName = task.Title,
                    Progress = task.Progress
                };
                progressReports.Add(report);
            }

            return progressReports;
        }
    }
}
