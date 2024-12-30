// Dans Projet.BLL/Services/ProjectService.cs
using System.Collections.Generic;
using System.Threading.Tasks;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly IMapper _mapper;

    public ProjectService(IProjectRepository projectRepository, IMapper mapper)
    {
        _projectRepository = projectRepository;
        _mapper = mapper;
    }

    public async Task<ProjectDTO> CreateProjectAsync(ProjectDTO projectDto)
    {
        var project = _mapper.Map<Project>(projectDto);
        var result = await _projectRepository.CreateProjectAsync(project);
        return _mapper.Map<ProjectDTO>(result);
    }

    public async Task<ProjectDTO> UpdateProjectAsync(int id, ProjectDTO projectDto)
    {
        var project = _mapper.Map<Project>(projectDto);
        project.Id = id;
        var result = await _projectRepository.UpdateProjectAsync(project);
        return _mapper.Map<ProjectDTO>(result);
    }

    public async Task DeleteProjectAsync(int id)
    {
        await _projectRepository.DeleteProjectAsync(id);
    }

    public async Task<ProjectDTO> GetProjectByIdAsync(int id)
    {
        var project = await _projectRepository.GetProjectByIdAsync(id);
        return _mapper.Map<ProjectDTO>(project);
    }

    public async Task<List<ProjectDTO>> GetAllProjectsAsync()
    {
        var projects = await _projectRepository.GetAllProjectsAsync();
        return _mapper.Map<List<ProjectDTO>>(projects);
    }
}