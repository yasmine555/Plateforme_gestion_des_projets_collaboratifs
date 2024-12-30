public class ProjectDbContext : DbContext
{
    public ProjectDbContext(DbContextOptions<ProjectDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectObjective> ProjectObjectives { get; set; }
    public DbSet<Deliverable> Deliverables { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .HasMany(p => p.Objectives)
            .WithOne()
            .HasForeignKey(o => o.ProjectId);

        modelBuilder.Entity<Project>()
            .HasMany(p => p.Deliverables)
            .WithOne()
            .HasForeignKey(d => d.ProjectId);
    }
}