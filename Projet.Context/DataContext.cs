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
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<User> User { get; set; }
        public DbSet<ProjectTask> ProjectTask { get; set; }

        public DbSet<Badge> Badge { get; set; }
        
        public DbSet<ProjectObjective> ProjectObjectives { get; set; }
        public DbSet<Deliverable> Deliverables { get; set; }
        public DbSet<ProjectTask> Tasks { get; set; }
        

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

            // Configuration de ProjectObjective
            modelBuilder.Entity<ProjectObjective>()
                .Property(o => o.Status)
                .IsRequired();

            // Configuration de Deliverable
            modelBuilder.Entity<Deliverable>()
                .Property(d => d.Status)
                .IsRequired();
        }



    }
}