import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand, CopyObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
});

const PRIVATE_BUCKET = process.env.S3_PRIVATE_BUCKET!;
const PUBLIC_BUCKET = process.env.S3_PUBLIC_BUCKET!;

// Generate pre-signed URL for private file download
export async function generateDownloadUrl(
  s3Key: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: PRIVATE_BUCKET,
      Key: s3Key,
    });

    const url = await getSignedUrl(s3Client as any, command as any, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating download URL:', error);
    throw error;
  }
}

// Generate pre-signed URL for file upload
export async function generateUploadUrl(
  s3Key: string,
  contentType: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: PRIVATE_BUCKET,
      Key: s3Key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(s3Client as any, command as any, { expiresIn });
    return url;
  } catch (error) {
    console.error('Error generating upload URL:', error);
    throw error;
  }
}

// Upload file to S3
export async function uploadFile(
  s3Key: string,
  file: Buffer | Uint8Array | Readable,
  contentType: string,
  bucket: 'private' | 'public' = 'private'
): Promise<void> {
  try {
    const bucketName = bucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: file,
      ContentType: contentType,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

// Delete file from S3
export async function deleteFile(
  s3Key: string,
  bucket: 'private' | 'public' = 'private'
): Promise<void> {
  try {
    const bucketName = bucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

// Check if file exists in S3
export async function fileExists(
  s3Key: string,
  bucket: 'private' | 'public' = 'private'
): Promise<boolean> {
  try {
    const bucketName = bucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    if ((error as any).name === 'NotFound') {
      return false;
    }
    console.error('Error checking file existence:', error);
    throw error;
  }
}

// Get file metadata
export async function getFileMetadata(
  s3Key: string,
  bucket: 'private' | 'public' = 'private'
): Promise<{
  size: number;
  lastModified: Date;
  contentType: string;
  etag: string;
} | null> {
  try {
    const bucketName = bucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    const response = await s3Client.send(command);
    
    return {
      size: response.ContentLength || 0,
      lastModified: response.LastModified || new Date(),
      contentType: response.ContentType || 'application/octet-stream',
      etag: response.ETag || '',
    };
  } catch (error) {
    if ((error as any).name === 'NotFound') {
      return null;
    }
    console.error('Error getting file metadata:', error);
    throw error;
  }
}

// Generate S3 key for product files
export function generateProductFileKey(productId: string, fileName: string): string {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `products/${productId}/${sanitizedFileName}`;
}

// Generate S3 key for blog post covers
export function generateBlogCoverKey(postId: string, fileName: string): string {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `blog/covers/${postId}/${sanitizedFileName}`;
}

// Generate S3 key for user avatars
export function generateAvatarKey(userId: string, fileName: string): string {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `avatars/${userId}/${sanitizedFileName}`;
}

// Generate S3 key for email templates
export function generateEmailTemplateKey(templateId: string, fileName: string): string {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `email-templates/${templateId}/${sanitizedFileName}`;
}

// Generate public URL for public assets
export function getPublicUrl(s3Key: string): string {
  const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN_NAME;
  if (cloudfrontDomain) {
    return `https://${cloudfrontDomain}/${s3Key}`;
  }
  return `https://${PUBLIC_BUCKET}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${s3Key}`;
}

// Copy file between buckets
export async function copyFile(
  sourceKey: string,
  destinationKey: string,
  sourceBucket: 'private' | 'public' = 'private',
  destinationBucket: 'private' | 'public' = 'public'
): Promise<void> {
  try {
    const sourceBucketName = sourceBucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    const destinationBucketName = destinationBucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new CopyObjectCommand({
      Bucket: destinationBucketName,
      Key: destinationKey,
      CopySource: `${sourceBucketName}/${sourceKey}`,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error copying file:', error);
    throw error;
  }
}

// List files in a directory
export async function listFiles(
  prefix: string,
  bucket: 'private' | 'public' = 'private',
  maxKeys: number = 1000
): Promise<Array<{
  key: string;
  size: number;
  lastModified: Date;
  etag: string;
}>> {
  try {
    const bucketName = bucket === 'private' ? PRIVATE_BUCKET : PUBLIC_BUCKET;
    
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: prefix,
    });

    // This is a simplified version - in practice, you'd use ListObjectsV2Command
    const response = await s3Client.send(command);
    
    // For now, return empty array - implement ListObjectsV2Command for full functionality
    return [];
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
}

// Validate file type
export function validateFileType(fileName: string, allowedTypes: string[]): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

// Get file size in human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate unique file name
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const baseName = originalName.replace(/\.[^/.]+$/, '');
  
  return `${baseName}_${timestamp}_${random}.${extension}`;
}

// Sanitize file name for S3
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

// Check if file is an image
export function isImageFile(fileName: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? imageExtensions.includes(extension) : false;
}

// Check if file is a document
export function isDocumentFile(fileName: string): boolean {
  const documentExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt', 'rtf'];
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? documentExtensions.includes(extension) : false;
}

// Check if file is an archive
export function isArchiveFile(fileName: string): boolean {
  const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? archiveExtensions.includes(extension) : false;
}

// Get content type from file extension
export function getContentType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const contentTypes: Record<string, string> = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'bmp': 'image/bmp',
    
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'txt': 'text/plain',
    'rtf': 'application/rtf',
    
    // Archives
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'tar': 'application/x-tar',
    'gz': 'application/gzip',
  };
  
  return contentTypes[extension || ''] || 'application/octet-stream';
}
