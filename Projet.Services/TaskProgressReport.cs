using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Projet.Services.Interfaces;
using Projet.Services;


namespace Projet.Services
{
    public class TaskProgressReport
    {
        public string MemberName { get; set; }
        public int CompletedTasks { get; set; }
        public int TotalTasks { get; set; }
        public double AverageProgress { get; set; }
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public double Progress { get; set; }
    }
}