import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    
    // Get Printify products
    const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Printify products');
    }
    
    const data = await response.json();
    
    // Transform Printify products to match our product format
    const transformedProducts = data.data.map((product: any) => ({
      id: `printify_${product.id}`,
      name: product.title,
      description: product.description || 'Custom designed merchandise',
      price: product.variants[0]?.price || 0,
      category: 'merchandise',
      gradeLevel: 'all',
      tags: ['merchandise', 'apparel', 'counselor'],
      status: 'active',
      imageUrl: product.images[0]?.src || '/placeholder-merch.jpg',
      printifyId: product.id,
      isPhysical: true,
      vendor: 'Printify',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    return NextResponse.json({
      success: true,
      data: transformedProducts,
      pagination: data.pagination
    });
    
  } catch (error) {
    console.error('Error fetching Printify products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Create product in Printify
    const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create Printify product');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: {
        id: `printify_${data.id}`,
        printifyId: data.id,
        name: data.title,
        isPhysical: true,
        vendor: 'Printify'
      }
    });
    
  } catch (error) {
    console.error('Error creating Printify product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
