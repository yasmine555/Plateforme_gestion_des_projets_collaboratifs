using Microsoft.EntityFrameworkCore;
using Projet.Entities;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;


namespace Projet.Context
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public  DbSet<Project> Project { get; set; }
        public  DbSet<User> User { get; set; }
        public DbSet<ProjectTask> ProjectTask { get; set; }

        public DbSet<Badge> Badge { get; set; }
        
        public DbSet<ProjectObjective> ProjectObjectives { get; set; }
        public DbSet<Deliverable> Deliverables { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration de Project -> Objectives
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Objectives)
                .WithOne()
                .HasForeignKey(o => o.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuration de Project -> Deliverables
            modelBuilder.Entity<Project>()
                .HasMany(p => p.Deliverables)
                .WithOne()
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuration de ProjectObjective
            modelBuilder.Entity<ProjectObjective>()
                .Property(o => o.Status)
                .IsRequired();

            // Configuration de Deliverable
            modelBuilder.Entity<Deliverable>()
                .Property(d => d.Status)
                .IsRequired();

            modelBuilder.Entity<User>()
    .HasMany(u => u.Badges)
    .WithOne(b => b.AwardedTo)  // Relation inverse avec AwardedTo
    .HasForeignKey(b => b.AwardedToId)  // Utilisation de AwardedToId
    .OnDelete(DeleteBehavior.Cascade);

        }
    }
}