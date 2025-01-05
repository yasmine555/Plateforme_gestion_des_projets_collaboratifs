using Microsoft.AspNetCore.Mvc;
using Projet.Entities;
using Projet.Services.Interfaces;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet("GetUsers")]
        public IActionResult GetUsers()
        {
            var users = _service.GetUsers();
            if (users != null && users.Any())
            {
                return Ok(users);
            }
            return NotFound(new { Message = "No users found." });
        }

        [HttpPost("AddUser")]
        public IActionResult AddUser([FromBody] User user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest(new { Message = "User data is required." });
                }
                var addedUser = _service.AddUser(user);
                return CreatedAtAction(nameof(GetUsers), new { id = addedUser.Id }, addedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var isDeleted = await _service.DeleteUser(id);  // Utilisation de 'await' pour appeler la méthode asynchrone
                if (isDeleted)
                {
                    return Ok(new { Message = "User deleted successfully." });
                }
                return NotFound(new { Message = "User not found." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }


        [HttpPut("UpdateUser")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                if (user == null)
                {
                    return BadRequest(new { Message = "User data is required." });
                }
                var updatedUser = _service.UpdateUser(user);
                return Ok(new { Message = "User updated successfully.", UpdatedUser = updatedUser });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}
