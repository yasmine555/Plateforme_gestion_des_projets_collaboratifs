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
        public virtual DbSet<Badge> Badge { get; set; }
        public virtual DbSet<ProjectTask> ProjectTask { get; set; }




    }
}