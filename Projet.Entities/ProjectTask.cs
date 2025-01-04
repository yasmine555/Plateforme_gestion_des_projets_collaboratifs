using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Projet.Entities
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public TaskStatus Status { get; set; }
        public int AssignedToId { get; set; }
        public virtual User AssignedTo { get; set; }
        public int Progress { get; set; }
        public int ProjectId { get; set; }
    }
}