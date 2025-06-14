// app/api/Wishlist/add/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid JSON format' 
        }, 
        { status: 400 }
      );
    }

    // Validation
    if (!body) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Request body is required' 
        }, 
        { status: 400 }
      );
    }

    if (!body.productId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Product ID is required' 
        }, 
        { status: 400 }
      );
    }

    const productId = body.productId.toString();

    // TODO: Thêm authentication check
    // const session = await getSession(request);
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { success: false, message: 'Authentication required' }, 
    //     { status: 401 }
    //   );
    // }

    // TODO: Kiểm tra product có tồn tại không
    try {
      const productCheckResponse = await fetch(`http://localhost:5091/api/products/${productId}`);
      if (!productCheckResponse.ok) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Product not found' 
          }, 
          { status: 404 }
        );
      }
    } catch (productError) {
      console.error('Error checking product:', productError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error validating product' 
        }, 
        { status: 500 }
      );
    }

    // TODO: Thực hiện logic thêm vào wishlist
    // Tạm thời return success để test
    console.log('Adding product to wishlist:', productId);
    
    // Simulate database operation
    // const result = await addToWishlist(session.user.id, productId);

    return NextResponse.json({ 
      success: true, 
      message: 'Product added to wishlist successfully',
      productId: productId
    });

  } catch (error: any) {
    console.error('Wishlist API Error:', error);
    
    // Log chi tiết lỗi để debug
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, 
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' }, 
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' }, 
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' }, 
    { status: 405 }
  );
}