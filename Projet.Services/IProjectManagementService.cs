using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Services
{
    public interface IProjectManagementService
    {
        Task<bool> AssignTaskToMember(int taskId, int userId, int currentUserId);
        Task<bool> UpdateTaskProgress(int taskId, int progress, int currentUserId);
        Task<bool> AwardBadge(int userId, string badgeName, int currentUserId);
        Task<List<TaskProgressReport>> GetTeamProgress(int currentUserId);
    }
}