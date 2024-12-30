using System.Collections.Generic;
using System;

public class ProjectDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Status { get; set; }
    public List<ProjectObjectiveDTO> Objectives { get; set; }
    public List<DeliverableDTO> Deliverables { get; set; }
}

public class ProjectObjectiveDTO
{
    public int Id { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
}

public class DeliverableDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
}