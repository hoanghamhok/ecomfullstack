using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Models;

namespace Controllers
{
    [Route("api/Wishlist")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        // Thêm sản phẩm vào wishlist
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddToWishlist([FromBody] WishlistRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Không tìm thấy sản phẩm.");

            var existingWishlist = await _context.Wishlists.FirstOrDefaultAsync(
                w => w.UserId == userId.ToString() && w.ProductId == request.ProductId);

            if (existingWishlist != null)
                return BadRequest("Sản phẩm đã có trong danh sách yêu thích.");

            var wishlistItem = new Wishlist
            {
                UserId = userId.ToString(),
                ProductId = request.ProductId,
                CreatedAt = DateTime.Now // ➜ Dùng để sắp xếp theo thời gian thêm mới nhất
            };

            _context.Wishlists.Add(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Thêm sản phẩm vào danh sách yêu thích thành công." });
        }

        // Lấy danh sách sản phẩm yêu thích
        [HttpGet("get")]
        [Authorize]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var wishlistItems = await _context.Wishlists
                .Where(w => w.UserId == userId.ToString())
                .Include(w => w.Product)
                .OrderByDescending(w => w.CreatedAt)
                .ToListAsync();

            if (!wishlistItems.Any())
                return NotFound("Danh sách yêu thích trống.");

            return Ok(wishlistItems);
        }

        // Xóa một sản phẩm khỏi wishlist
        [HttpDelete("remove/{productId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFromWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var item = await _context.Wishlists.FirstOrDefaultAsync(
                w => w.UserId == userId.ToString() && w.ProductId == productId);

            if (item == null)
                return NotFound("Không tìm thấy sản phẩm trong danh sách yêu thích.");

            _context.Wishlists.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Xóa sản phẩm khỏi danh sách yêu thích thành công." });
        }

        // Xóa toàn bộ wishlist
        [HttpDelete("clear")]
        [Authorize]
        public async Task<IActionResult> ClearWishlist()
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var items = await _context.Wishlists
                .Where(w => w.UserId == userId.ToString())
                .ToListAsync();

            if (!items.Any())
                return NotFound("Danh sách yêu thích đã trống.");

            _context.Wishlists.RemoveRange(items);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa toàn bộ danh sách yêu thích." });
        }

        // Kiểm tra sản phẩm có nằm trong wishlist không
        [HttpGet("check/{productId}")]
        [Authorize]
        public async Task<IActionResult> CheckInWishlist(int productId)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var exists = await _context.Wishlists.AnyAsync(
                w => w.UserId == userId.ToString() && w.ProductId == productId);

            return Ok(new { inWishlist = exists });
        }

        // Chuyển sản phẩm từ wishlist sang giỏ hàng
        [HttpPost("move-to-cart")]
        [Authorize]
        public async Task<IActionResult> MoveToCart([FromBody] MoveToCartRequest request)
        {
            var userId = GetUserIdFromToken();
            if (userId == null)
                return Unauthorized("Không tìm thấy người dùng.");

            var wishlistItem = await _context.Wishlists.FirstOrDefaultAsync(
                w => w.UserId == userId.ToString() && w.ProductId == request.ProductId);

            if (wishlistItem == null)
                return NotFound("Không tìm thấy sản phẩm trong danh sách yêu thích.");

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Không tìm thấy sản phẩm.");

            var existingCart = await _context.Carts.FirstOrDefaultAsync(
                c => c.UserId == userId && c.ProductId == request.ProductId);

            if (existingCart != null)
            {
                existingCart.Quantity += request.Quantity;
                _context.Carts.Update(existingCart);
            }
            else
            {
                var cartItem = new Cart
                {
                    UserId = (int)userId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    CreatedAt = DateTime.Now
                };
                _context.Carts.Add(cartItem);
            }

            _context.Wishlists.Remove(wishlistItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Chuyển sản phẩm vào giỏ hàng thành công." });
        }

        // Lấy ID người dùng từ Token (JWT)
        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

            return userIdClaim != null ? int.Parse(userIdClaim.Value) : (int?)null;
        }

        // ==================== CLASS DỮ LIỆU ====================

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
