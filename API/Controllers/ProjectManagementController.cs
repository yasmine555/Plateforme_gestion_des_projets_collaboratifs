[ApiController]
[Route("api/[controller]")]
public class ProjectManagementController : ControllerBase
{
    private readonly IProjectManagementService _projectService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ProjectManagementController(
        IProjectManagementService projectService,
        IHttpContextAccessor httpContextAccessor)
    {
        _projectService = projectService;
        _httpContextAccessor = httpContextAccessor;
    }

    private int GetCurrentUserId()
    {
        // Implémentez votre logique pour obtenir l'ID de l'utilisateur connecté
        // Par exemple, à partir des claims d'identité
        return int.Parse(_httpContextAccessor.HttpContext.User.FindFirst("userId").Value);
    }

    [HttpPost("assign-task")]
    public async Task<IActionResult> AssignTask(int taskId, int userId)
    {
        try
        {
            var result = await _projectService.AssignTaskToMember(taskId, userId, GetCurrentUserId());
            return result ? Ok() : BadRequest();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPut("update-progress")]
    public async Task<IActionResult> UpdateProgress(int taskId, int progress)
    {
        try
        {
            var result = await _projectService.UpdateTaskProgress(taskId, progress, GetCurrentUserId());
            return result ? Ok() : BadRequest();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPost("award-badge")]
    public async Task<IActionResult> AwardBadge(int userId, string badgeName)
    {
        try
        {
            var result = await _projectService.AwardBadge(userId, badgeName, GetCurrentUserId());
            return result ? Ok() : BadRequest();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpGet("team-progress")]
    public async Task<ActionResult<List<TaskProgressReport>>> GetTeamProgress()
    {
        try
        {
            return await _projectService.GetTeamProgress(GetCurrentUserId());
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
}