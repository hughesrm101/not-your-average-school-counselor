import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Create order in Printify
    const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create Printify order');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: {
        printifyOrderId: data.id,
        status: data.status,
        trackingNumber: data.tracking_number,
        shippingAddress: data.shipping_address
      }
    });
    
  } catch (error) {
    console.error('Error creating Printify order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';
    
    // Get Printify orders
    const response = await fetch(`https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch Printify orders');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data.data,
      pagination: data.pagination
    });
    
  } catch (error) {
    console.error('Error fetching Printify orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
