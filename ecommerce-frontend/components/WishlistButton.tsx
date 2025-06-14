'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface WishlistButtonProps {
  productId: number
  userId?: string // Optional nếu bạn dùng token để xác định user
}

// Kiểu dữ liệu trả về từ API check wishlist
interface WishlistCheckResponse {
  inWishlist: boolean;
}

export default function WishlistButton({ productId, userId }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Kiểm tra khi component mount hoặc productId thay đổi
  useEffect(() => {
    checkInWishlist()
  }, [productId])

  const checkInWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get<WishlistCheckResponse>(
        `http://localhost:5000/api/Wishlist/check/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      })
      setIsInWishlist(response.data.inWishlist)
    } catch (error) {
      console.error('Lỗi khi kiểm tra wishlist:', error)
    }
  }

  const handleToggleWishlist = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Vui lòng đăng nhập để sử dụng tính năng này')
        setLoading(false)
        return
      }

      if (isInWishlist) {
        // Xóa khỏi wishlist
        await axios.delete(`http://localhost:5000/api/Wishlist/remove/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setIsInWishlist(false)
      } else {
        // Thêm vào wishlist
        await axios.post('http://localhost:5000/api/Wishlist/add', {
          productId
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        setIsInWishlist(true)
      }
    } catch (error: any) {
      console.error('Lỗi wishlist:', error)

      if (error.response?.status === 401) {
        setError('Vui lòng đăng nhập để sử dụng tính năng này')
      } else if (error.response?.status === 400) {
        setError('Sản phẩm đã có trong danh sách yêu thích')
      } else {
        setError('Có lỗi xảy ra, vui lòng thử lại')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wishlist-button-container">
      <button 
        onClick={handleToggleWishlist} 
        disabled={loading}
        className={`wishlist-btn ${isInWishlist ? 'in-wishlist' : 'not-in-wishlist'} ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          'Đang xử lý...'
        ) : isInWishlist ? (
          '❤️ Đã yêu thích'
        ) : (
          '🤍 Thêm vào wishlist'
        )}
      </button>

      {error && (
        <div className="error-message" style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
          {error}
        </div>
      )}

      <style jsx>{`
        .wishlist-btn {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
        }

        .wishlist-btn:hover:not(:disabled) {
          background: #f5f5f5;
        }

        .wishlist-btn.in-wishlist {
          background: #ffe6e6;
          border-color: #ff4757;
          color: #ff4757;
        }

        .wishlist-btn.loading {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .wishlist-btn:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}
