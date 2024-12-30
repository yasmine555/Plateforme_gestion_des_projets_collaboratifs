public class Project
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public required string Status { get; set; }
    
    // Pour les objectifs et livrables
    public required List<ProjectObjective> Objectives { get; set; }
    public required List<Deliverable> Deliverables { get; set; }

    public Project(string name, string description, string status, string objectives, string deliverables)
    {
        Name = name;
        Description = description;
        Status = status;
        Objectives = objectives;
        Deliverables = deliverables;
    }
}

public class ProjectObjective
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
}

public class Deliverable
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
}