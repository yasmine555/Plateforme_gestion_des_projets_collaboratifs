using Projet.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projet.Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetUsers();
        User AddUser(User user);
        bool DeleteUser(int id);
        User UpdateUser(User user);
    }
}
