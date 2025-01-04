using Projet.DAL.Contracts;
using Projet.DAL.Repos;
using Projet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Services
{
    public class ProjectManagementService : IProjectManagementService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IBadgeRepository _badgeRepository;
        private readonly IUserRepository _userRepository;

        public ProjectManagementService(
            ITaskRepository taskRepository,
            IBadgeRepository badgeRepository,
            IUserRepository userRepository)
        {
            _taskRepository = taskRepository;
            _badgeRepository = badgeRepository;
            _userRepository = userRepository;
        }

        private async Task<bool> IsProjectManager(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return user?.Role == UserRole.ChefDeProjet;
        }

        public async Task<bool> AssignTaskToMember(int taskId, int userId, int currentUserId)
        {
            if (!await IsProjectManager(currentUserId))
                throw new UnauthorizedAccessException("Seul un chef de projet peut assigner des tâches.");

            var member = await _userRepository.GetByIdAsync(userId);
            if (member?.Role != UserRole.MembreEquipe)
                throw new InvalidOperationException("Les tâches ne peuvent être assignées qu'aux membres de l'équipe.");

            return await _taskRepository.AssignTaskAsync(taskId, userId);
        }

        public async Task<bool> UpdateTaskProgress(int taskId, int progress, int currentUserId)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);
            if (task == null) return false;

            var isProjectManager = await IsProjectManager(currentUserId);
            if (!isProjectManager && task.AssignedToId != currentUserId)
                throw new UnauthorizedAccessException("Vous n'avez pas les droits pour modifier cette tâche.");

            var result = await _taskRepository.UpdateProgressAsync(taskId, progress);

            // Vérification pour l'attribution automatique de badges
            if (result && progress == 100)
            {
                var userTasks = await _taskRepository.GetTasksByUserIdAsync(task.AssignedToId);
                var completedTasks = userTasks.Count(t => t.Status == StatusTask.Completed);

                // Attribution de badges en fonction du nombre de tâches complétées
                if (completedTasks == 5)
                    await _badgeRepository.AwardBadgeAsync(task.AssignedToId, "Bronze - 5 tâches complétées");
                else if (completedTasks == 10)
                    await _badgeRepository.AwardBadgeAsync(task.AssignedToId, "Argent - 10 tâches complétées");
                else if (completedTasks == 20)
                    await _badgeRepository.AwardBadgeAsync(task.AssignedToId, "Or - 20 tâches complétées");
            }

            return result;
        }

        public async Task<bool> AwardBadge(int userId, string badgeName, int currentUserId)
        {
            if (!await IsProjectManager(currentUserId))
                throw new UnauthorizedAccessException("Seul un chef de projet peut attribuer des badges.");

            var member = await _userRepository.GetByIdAsync(userId);
            if (member?.Role != UserRole.MembreEquipe)
                throw new InvalidOperationException("Les badges ne peuvent être attribués qu'aux membres de l'équipe.");

            return await _badgeRepository.AwardBadgeAsync(userId, badgeName);
        }

        public async Task<List<TaskProgressReport>> GetTeamProgress(int currentUserId)
        {
            if (!await IsProjectManager(currentUserId))
                throw new UnauthorizedAccessException("Seul un chef de projet peut voir le progrès global de l'équipe.");

            var tasks = await _taskRepository.GetAllTasksAsync();
            var teamMembers = (await _userRepository.GetAllAsync())
                .Where(u => u.Role == UserRole.MembreEquipe);

            var reports = new List<TaskProgressReport>();

            foreach (var member in teamMembers)
            {
                var memberTasks = tasks.Where(t => t.AssignedToId == member.Id).ToList();
                var badges = await _badgeRepository.GetBadgesByUserIdAsync(member.Id);

                reports.Add(new TaskProgressReport
                {
                    MemberName = member.Name,
                    CompletedTasks = memberTasks.Count(t => t.Status == TaskStatus.Completed),
                    TotalTasks = memberTasks.Count,
                    AverageProgress = memberTasks.Any() ? memberTasks.Average(t => t.Progress) : 0,
                    TotalBadges = badges.Count()
                });
            }

            return reports;
        }
    }
}