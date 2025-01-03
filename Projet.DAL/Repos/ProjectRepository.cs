using Microsoft.EntityFrameworkCore;
using Projet.Context;
using Projet.DAL;
using Projet.DAL.Contracts;
using Projet.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ProjectRepo : GenericRepository<Project>
{
    private readonly ProjectDbContext _context;

    public ProjectRepo(DataContext context) : base(context)
    {
    }

    public async Task<Project> CreateProjectAsync(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task<Project> GetProjectByIdAsync(int id)
    {
        return await _context.Projects
            .Include(p => p.Objectives)
            .Include(p => p.Deliverables)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<List<Project>> GetAllProjectsAsync()
    {
        return await _context.Projects
            .Include(p => p.Objectives)
            .Include(p => p.Deliverables)
            .ToListAsync();
    }

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        _context.Entry(project).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return project;
    }

    public async Task DeleteProjectAsync(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project != null)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }

}