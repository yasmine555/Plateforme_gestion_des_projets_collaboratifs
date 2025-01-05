using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.DAL.Contracts
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : class;
        void Commit();
        Task CommitAsync();
        IProjectRepository Projects { get; }
        Task SaveChangesAsync();
    }
}
