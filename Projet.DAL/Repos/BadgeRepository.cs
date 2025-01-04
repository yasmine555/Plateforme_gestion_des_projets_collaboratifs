using Microsoft.EntityFrameworkCore;
using Projet.DAL.Contracts;
using Projet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.DAL
{
    public class BadgeRepository : IBadgeRepository
    {
        private readonly Projet.Context.DataContext _context;

        public BadgeRepository(Projet.Context.DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AwardBadgeAsync(int userId, string badgeName)
        {
            var user = await _context.User.FindAsync(userId);
            if (user == null) return false;

            var badge = new Badge
            {
                Name = badgeName,
                Description = $"Badge attribué à {user.Name}",
                AwardedDate = DateTime.UtcNow,
                AwardedToId = userId
            };

            _context.Badge.Add(badge);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Badge>> GetBadgesByUserIdAsync(int userId)
        {
            return await _context.Badge
                .Where(b => b.AwardedToId == userId)
                .ToListAsync();
        }
    }
}