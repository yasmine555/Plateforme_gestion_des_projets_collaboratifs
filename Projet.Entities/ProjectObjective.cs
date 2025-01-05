using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Entities
{
    public class ProjectObjective
    {
        public int Id { get; set; }
        public int ProjectId { get; set; } // Clé étrangère vers Project
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string Status { get; set; }

        // Navigation vers le projet
        public Project Project { get; set; }
    }
}
