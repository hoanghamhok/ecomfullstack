using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Controllers{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context){
            _context = context;
        }

        //Tạo mới người dùng (User)
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(
            [FromBody] CreateUserRequest request)
        {
            //Kiểm tra xem Username đã tồn tại chưa
            if (await _context.Users.AnyAsync(
                u => u.Username == request.Username))
                return BadRequest("Username đã tồn tại.");

            var user = new User{
                Username = request.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(
                                        request.Password),
                FullName = request.FullName,
                Role = "nhanvien",
                Phone = request.Phone,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), 
                            new {id = user.Id}, user);   
        }

        //Lấy người dùng
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id){
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();
            return user;
        }


    }

    public class CreateUserRequest{
        public string Username {get; set;}
        public string Password {get; set;}
        public string FullName {get; set;}
        public string Phone {get; set;}
    }
}