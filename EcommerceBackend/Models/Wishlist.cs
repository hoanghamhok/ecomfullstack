using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models // đổi thành namespace của bạn
{
    [Table("Wishlist")]
    public class Wishlist
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation Properties (tuỳ chọn)
        public virtual User? User { get; set; }
        public virtual Product? Product { get; set; }
    }
}
