using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Services
{
    public class TaskProgressReport
    {
        public string MemberName { get; set; }
        public int CompletedTasks { get; set; }
        public int TotalTasks { get; set; }
        public double AverageProgress { get; set; }
    }
}