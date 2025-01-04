using Projet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.DAL.Contracts
{
    public interface IBadgeRepository
    {
        Task<bool> AwardBadgeAsync(int userId, string badgeName);
        Task AwardBadgeAsync(object assignedToId, string v);
        Task<IEnumerable<Badge>> GetBadgesByUserIdAsync(int userId);
    }
}