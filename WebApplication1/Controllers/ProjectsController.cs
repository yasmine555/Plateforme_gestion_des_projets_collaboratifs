using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDTO>> CreateProject([FromBody] ProjectDTO project)
    {
        var result = await _projectService.CreateProjectAsync(project);
        return CreatedAtAction(nameof(GetProject), new { id = result.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectDTO>> UpdateProject(int id, [FromBody] ProjectDTO project)
    {
        var result = await _projectService.UpdateProjectAsync(id, project);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProject(int id)
    {
        await _projectService.DeleteProjectAsync(id);
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDTO>> GetProject(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        return Ok(project);
    }
}