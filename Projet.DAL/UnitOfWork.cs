using Microsoft.EntityFrameworkCore;
using Projet.Context;
using Projet.DAL.Contracts;
using Projet.Entities;
using System;
using System.Collections.Generic;

namespace Projet.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;  // Ajoutez le DbContext
        private readonly Dictionary<Type, object> _repositories;  // Dictionnaire générique pour les repositories

        public IProjectRepository Projects => throw new NotImplementedException();

        public UnitOfWork(DataContext context, IRepository<User> userRepo, IRepository<Client> clientRepo, IRepository<Project> projectRepo)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));  // Assurez-vous que le contexte est injecté correctement
            _repositories = new Dictionary<Type, object>();  // Initialisation du dictionnaire
            _repositories.Add(typeof(User), userRepo);
            _repositories.Add(typeof(Client), clientRepo);
            _repositories.Add(typeof(Project), projectRepo);
        }

        public IRepository<T> GetRepository<T>() where T : class
        {
            if (_repositories.ContainsKey(typeof(T)))
            {
                return (IRepository<T>)_repositories[typeof(T)];
            }
            else
            {
                throw new KeyNotFoundException($"Repository for {typeof(T)} not found.");
            }
        }

        public void Commit()
        {
            _context.SaveChanges();  // Enregistrez les modifications dans la base de données
        }

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
