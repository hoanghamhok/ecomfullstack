using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Models;

namespace Controllers
{
    [Route("api/wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        // ==================== API ====================

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddToWishlist([FromBody] WishlistRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Không tìm thấy sản phẩm.");

            var exists = await _context.Wishlists.AnyAsync(w =>
                w.UserId == userId && w.ProductId == request.ProductId);
            if (exists)
                return BadRequest("Sản phẩm đã có trong danh sách yêu thích.");

            _context.Wishlists.Add(new Wishlist
            {
                UserId = userId,
                ProductId = request.ProductId,
                CreatedAt = DateTime.Now
            });

            await _context.SaveChangesAsync();
            return Ok(new { message = "Thêm vào danh sách yêu thích thành công." });
        }

        [HttpGet("get")]
        [Authorize]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var wishlist = await _context.Wishlists
                .Where(w => w.UserId == userId)
                .Include(w => w.Product)
                .OrderByDescending(w => w.CreatedAt)
                .ToListAsync();

            if (!wishlist.Any())
                return NotFound("Danh sách yêu thích trống.");

            return Ok(wishlist);
        }

        [HttpDelete("remove/{productId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFromWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var item = await _context.Wishlists.FirstOrDefaultAsync(w =>
                w.UserId == userId && w.ProductId == productId);

            if (item == null)
                return NotFound("Không tìm thấy sản phẩm trong danh sách yêu thích.");

            _context.Wishlists.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa sản phẩm khỏi danh sách yêu thích." });
        }

        [HttpDelete("clear")]
        [Authorize]
        public async Task<IActionResult> ClearWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var items = await _context.Wishlists.Where(w => w.UserId == userId).ToListAsync();
            if (!items.Any())
                return NotFound("Danh sách yêu thích đã trống.");

            _context.Wishlists.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa toàn bộ danh sách yêu thích." });
        }

        [HttpGet("check/{productId}")]
        [Authorize]
        public async Task<IActionResult> CheckInWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var exists = await _context.Wishlists.AnyAsync(w =>
                w.UserId == userId && w.ProductId == productId);

            return Ok(new { inWishlist = exists });
        }

        [HttpPost("move-to-cart")]
        [Authorize]
        public async Task<IActionResult> MoveToCart([FromBody] MoveToCartRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized(new { error = "Không tìm thấy người dùng từ token." });

            var wishlistItem = await _context.Wishlists.FirstOrDefaultAsync(w =>
                w.UserId == userId && w.ProductId == request.ProductId);
            if (wishlistItem == null)
                return NotFound("Không tìm thấy sản phẩm trong danh sách yêu thích.");

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Không tìm thấy sản phẩm.");

            var existingCart = await _context.Carts.FirstOrDefaultAsync(c =>
                c.UserId == int.Parse(userId) && c.ProductId == request.ProductId);

            if (existingCart != null)
            {
                existingCart.Quantity += request.Quantity;
                _context.Carts.Update(existingCart);
            }
            else
            {
                _context.Carts.Add(new Cart
                {
                    UserId = int.Parse(userId),
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    CreatedAt = DateTime.Now
                });
            }

            _context.Wishlists.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Chuyển vào giỏ hàng thành công." });
        }

        // ==================== HÀM HỖ TRỢ ====================

        private string? GetUserIdFromToken()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);
            return claim?.Value;
        }

        // ==================== DTO ====================

        public class WishlistRequest
        {
            public int ProductId { get; set; }
        }

        public class MoveToCartRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; } = 1;
        }
    }
}
