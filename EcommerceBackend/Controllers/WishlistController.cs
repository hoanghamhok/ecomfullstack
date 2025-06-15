using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Models;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        // Lấy UserId từ JWT Token
        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return null;

            if (int.TryParse(userIdClaim.Value, out int userId))
                return userId;

            return null;
        }

        // GET: api/Wishlist/get
        [HttpGet("get")]
        [Authorize]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var wishlist = await _context.Wishlists
                .Where(w => w.UserId == userId.ToString())
                .Include(w => w.Product)
                .ToListAsync();

            return Ok(wishlist);
        }

        // POST: api/Wishlist/add
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddToWishlist([FromBody] WishlistRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return NotFound("Sản phẩm không tồn tại.");

            var exists = await _context.Wishlists
                .AnyAsync(w => w.UserId == userId.ToString() && w.ProductId == request.ProductId);

            if (exists)
                return Ok(new { message = "Sản phẩm đã có trong danh sách yêu thích." });

            var wishlistItem = new Wishlist
            {
                UserId = userId.ToString(),
                ProductId = request.ProductId
            };

            _context.Wishlists.Add(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã thêm vào danh sách yêu thích." });
        }

        // DELETE: api/Wishlist/remove/5
        [HttpDelete("remove/{productId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFromWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var item = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.UserId == userId.ToString() && w.ProductId == productId);

            if (item == null)
                return NotFound("Sản phẩm không có trong danh sách yêu thích.");

            _context.Wishlists.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa khỏi danh sách yêu thích." });
        }

        // GET: api/Wishlist/check/5
        [HttpGet("check/{productId}")]
        [Authorize]
        public async Task<IActionResult> CheckProductInWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var exists = await _context.Wishlists
                .AnyAsync(w => w.UserId == userId.ToString() && w.ProductId == productId);

            return Ok(new { inWishlist = exists });
        }

        // GET: api/Wishlist/count
        [HttpGet("count")]
        [Authorize]
        public async Task<IActionResult> GetWishlistCount()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var count = await _context.Wishlists
                .CountAsync(w => w.UserId == userId.ToString());

            return Ok(new { count });
        }

        // DELETE: api/Wishlist/clear
        [HttpDelete("clear")]
        [Authorize]
        public async Task<IActionResult> ClearWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null) return Unauthorized("Không xác định được người dùng.");

            var items = await _context.Wishlists
                .Where(w => w.UserId == userId.ToString())
                .ToListAsync();

            _context.Wishlists.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa toàn bộ danh sách yêu thích.", removedCount = items.Count });
        }

        public class WishlistRequest
        {
            public int ProductId { get; set; }
        }
    }
}
