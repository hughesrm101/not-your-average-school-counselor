import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { DatabaseService } from '@/lib/db/dynamo';

export async function GET(request: NextRequest) {
  try {
    const products = await DatabaseService.getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const productData = await request.json();

    if (!productData.name || !productData.description || !productData.price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const product = await DatabaseService.createProduct({
      id: productId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category || 'digital',
      type: productData.type || 'resource',
      status: productData.status || 'active',
      tags: productData.tags || [],
      images: productData.images || [],
      slug,
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
