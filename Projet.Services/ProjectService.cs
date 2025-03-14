using Projet.DAL.Contracts;
using Projet.Entities;
using Projet.Services.Interfaces;

namespace Projet.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProjectRepository _projectRepository;

        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public ProjectService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Project> GetProjectByIdAsync(int id)
        {
            return await _unitOfWork.Projects.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            return await _unitOfWork.Projects.GetAllAsync();
        }

        public async Task CreateProjectAsync(Project project)
        {
            if (project == null)
                throw new ArgumentNullException(nameof(project));

            // Ajoutez la logique pour cr�er un projet
            await _projectRepository.AddProjectAsync(project);
        }

        public async Task UpdateProjectAsync(Project project)
        {
            _unitOfWork.Projects.Update(project);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteProjectAsync(int id)
        {
            var project = await GetProjectByIdAsync(id);
            if (project != null)
            {
                _unitOfWork.Projects.Remove(project);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        Task<Project> IProjectService.CreateProjectAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public Task<Project> UpdateProjectAsync(int id, Project project)
        {
            throw new NotImplementedException();
        }

        Task<List<Project>> IProjectService.GetAllProjectsAsync()
        {
            throw new NotImplementedException();
        }
    }
}