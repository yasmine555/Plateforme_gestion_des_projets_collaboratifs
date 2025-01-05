using Projet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Projet.DAL.Contracts
{
    public interface IBadgeRepository
    {
        Task<bool> AwardBadgeAsync(int userId, string badgeName); // La méthode correcte
        Task<IEnumerable<Badge>> GetBadgesByUserIdAsync(int userId);
    }
}
