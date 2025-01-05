namespace Projet.Entities
{

    public class Project
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public required string Status { get; set; }

        // Pour les objectifs et livrables
        public List<ProjectObjective> Objectives { get; set; } = new List<ProjectObjective>();
        public List<Deliverable> Deliverables { get; set; } = new List<Deliverable>();

        // Constructeur sans paramètre pour EF
        public Project() { }

        public Project(string name, string description, string status, List<ProjectObjective> objectives, List<Deliverable> deliverables)
        {
            Name = name;
            Description = description;
            Status = status;
            Objectives = objectives;
            Deliverables = deliverables;
        }
    }

    

   
}