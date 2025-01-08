using Microsoft.EntityFrameworkCore;
using Projet.BLL;
using Projet.BLL.Contract;
using Projet.Context;
using Projet.DAL;
using Projet.DAL.Contracts;
using Projet.DAL.Repos;
using Projet.Entities;
using Projet.Services;
using Projet.DAL.Repos;
using Projet.Services.Interfaces;

// Configuration du DbContext dans Program.cs
var builder = WebApplication.CreateBuilder(args);

var Cnx = builder.Configuration.GetConnectionString("ConnectionString");

// Ajoutez cette ligne pour configurer le DbContext
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(Cnx));

builder.Services.AddControllers();

// Enregistrement des autres services
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<IGenericBLL<User>, GenericBLL<User>>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRepository<Project>, ProjectRepo>();
builder.Services.AddScoped<IRepository<Client>, ClientRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectManagementService, ProjectManagementService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();


// Configuration de Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Projet DOTNET API", Version = "v1" });
});


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("AllowAll");


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthorization();
app.MapControllers();

app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Projet DOTNET API V1");
});

app.Run();

