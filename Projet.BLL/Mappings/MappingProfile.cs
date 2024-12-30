public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Project, ProjectDTO>().ReverseMap();
        CreateMap<ProjectObjective, ProjectObjectiveDTO>().ReverseMap();
        CreateMap<Deliverable, DeliverableDTO>().ReverseMap();
    }
}