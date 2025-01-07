namespace Projet.Entities
{
    public class Project
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public required string Status { get; set; }

        // Pour les objectifs et livrables
        public ICollection<ProjectObjective> Objectives { get; set; }
        public ICollection<Deliverable> Deliverables { get; set; }

        // Constructeur sans paramètre pour EF
        public Project()
        {
            Objectives = new List<ProjectObjective>();
            Deliverables = new List<Deliverable>();
        }

        // Constructeur avec paramètres
        public Project(string name, string description, string status, List<ProjectObjective> objectives = null, List<Deliverable> deliverables = null)
        {
            Name = name;
            Description = description;
            Status = status;
            Objectives = objectives ?? new List<ProjectObjective>();
            Deliverables = deliverables ?? new List<Deliverable>();
        }

        // Méthode pour valider la cohérence des dates
        public bool AreDatesValid()
        {
            return !StartDate.HasValue || !EndDate.HasValue || StartDate <= EndDate;
        }
    }
}
