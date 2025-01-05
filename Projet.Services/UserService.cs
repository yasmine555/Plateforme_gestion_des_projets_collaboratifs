using Projet.BLL.Contract;
using Projet.Entities;
using Projet.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace Projet.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericBLL<User> _userBLL;

        public UserService(IGenericBLL<User> userBLL)
        {
            _userBLL = userBLL;
        }

        public IEnumerable<User> GetUsers()
        {
            return _userBLL.GetMany();
        }

        public User AddUser(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            _userBLL.Add(user);
            _userBLL.Submit();
            return user;
        }

        public async Task<bool> DeleteUser(int id)
        {
            var user = await _userBLL.GetById(id);
            if (user == null) return false;
            _userBLL.Delete(user);
            await _userBLL.Submit();
            return true;
        }



        public User UpdateUser(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            _userBLL.Update(user);
            _userBLL.Submit();
            return user;
        }
    }
}
