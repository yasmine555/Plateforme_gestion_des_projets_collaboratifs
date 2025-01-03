using Microsoft.AspNetCore.Mvc;
using Projet.Entities;
using Projet.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/project/all
        [HttpGet("all")]
        public async Task<ActionResult<List<Project>>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/project/details/5
        [HttpGet("details/{id}")]
        public async Task<ActionResult<Project>> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // POST: api/project/add
        [HttpPost("add")]
        public async Task<ActionResult<Project>> AddProject([FromBody] Project project)
        {
            if (project == null)
            {
                return BadRequest();
            }
            var createdProject = await _projectService.CreateProjectAsync(project);
            return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
        }

        // PUT: api/project/update/5
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Project>> UpdateProject(int id, [FromBody] Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            var updatedProject = await _projectService.UpdateProjectAsync(id, project);
            return Ok(updatedProject);
        }

        // DELETE: api/project/delete/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            await _projectService.DeleteProjectAsync(id);
            return NoContent();
        }
    }
}
