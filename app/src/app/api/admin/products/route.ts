import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { requireAdmin } from '@/lib/rbac';
import { db, generateId } from '@/lib/db/dynamo';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin access
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await requireAdmin(user);

    // Parse form data
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const price = parseFloat(formData.get('price') as string);
    const status = formData.get('status') as string;
    const category = formData.get('category') as string;
    const grades = JSON.parse(formData.get('grades') as string);
    const tags = JSON.parse(formData.get('tags') as string);
    const isDigital = formData.get('isDigital') === 'true';
    const featured = formData.get('featured') === 'true';
    const newRelease = formData.get('newRelease') === 'true';
    const bestSeller = formData.get('bestSeller') === 'true';
    
    const file = formData.get('file') as File;
    const previewImages: File[] = [];
    
    // Extract preview images
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (key.startsWith('previewImage_') && value instanceof File) {
        previewImages.push(value);
      }
    }

    // Generate product ID and slug
    const productId = generateId('product');
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Upload main file to S3
    let fileUrl = '';
    if (file) {
      const fileKey = `products/${productId}/${file.name}`;
      const fileBuffer = await file.arrayBuffer();
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        Body: new Uint8Array(fileBuffer),
        ContentType: file.type,
      }));
      
      fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }

    // Upload preview images to S3
    const previewImageUrls: string[] = [];
    for (let i = 0; i < previewImages.length; i++) {
      const image = previewImages[i];
      const imageKey = `products/${productId}/previews/${i}-${image.name}`;
      const imageBuffer = await image.arrayBuffer();
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: imageKey,
        Body: new Uint8Array(imageBuffer),
        ContentType: image.type,
      }));
      
      previewImageUrls.push(`https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`);
    }

    // Create product in database
    const product = {
      PK: `PRODUCT#${productId}`,
      SK: 'PRODUCT',
      GSI1PK: `PRODUCT#${status}`,
      GSI1SK: `PRODUCT#${new Date().toISOString()}`,
      GSI2PK: `PRODUCT#${category}`,
      GSI2SK: `PRODUCT#${productId}`,
      GSI3PK: `PRODUCT#featured`,
      GSI3SK: featured ? `PRODUCT#${new Date().toISOString()}` : `PRODUCT#${productId}`,
      GSI4PK: `PRODUCT#${slug}`,
      GSI4SK: 'PRODUCT',
      
      productId,
      name,
      slug,
      description,
      shortDescription,
      price,
      status,
      category,
      grades,
      tags,
      isDigital,
      featured,
      newRelease,
      bestSeller,
      
      fileUrl,
      previewImageUrls,
      
      downloads: 0,
      sales: 0,
      rating: 0,
      reviewCount: 0,
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user['cognito:username'],
    };

    await db.putItem(product);

    return NextResponse.json({ 
      success: true, 
      product: {
        id: productId,
        name,
        slug,
        status
      }
    });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin access
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await requireAdmin(user);

    // Get all products
    const products = await db.queryItems(
      'PRODUCT',
      'GSI1PK = :status',
      { ':status': 'PRODUCT#active' },
      'GSI1'
    );

    return NextResponse.json({ products });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
