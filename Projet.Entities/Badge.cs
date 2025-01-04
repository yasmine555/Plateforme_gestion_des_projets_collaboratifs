using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Entities
{
    public class Badge
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime AwardedDate { get; set; }
        public int AwardedToId { get; set; }
        public virtual User AwardedTo { get; set; }
    }
}