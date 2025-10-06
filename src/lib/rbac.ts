import { UserRole } from '@/types';

// Permission definitions
export enum Permission {
  // User permissions
  READ_PROFILE = 'read:profile',
  UPDATE_PROFILE = 'update:profile',
  DELETE_PROFILE = 'delete:profile',
  
  // Product permissions
  READ_PRODUCTS = 'read:products',
  CREATE_PRODUCTS = 'create:products',
  UPDATE_PRODUCTS = 'update:products',
  DELETE_PRODUCTS = 'delete:products',
  
  // Bundle permissions
  READ_BUNDLES = 'read:bundles',
  CREATE_BUNDLES = 'create:bundles',
  UPDATE_BUNDLES = 'update:bundles',
  DELETE_BUNDLES = 'delete:bundles',
  
  // Order permissions
  READ_ORDERS = 'read:orders',
  CREATE_ORDERS = 'create:orders',
  UPDATE_ORDERS = 'update:orders',
  DELETE_ORDERS = 'delete:orders',
  
  // Download permissions
  READ_DOWNLOADS = 'read:downloads',
  CREATE_DOWNLOADS = 'create:downloads',
  
  // Coupon permissions
  READ_COUPONS = 'read:coupons',
  CREATE_COUPONS = 'create:coupons',
  UPDATE_COUPONS = 'update:coupons',
  DELETE_COUPONS = 'delete:coupons',
  
  // User management permissions
  READ_USERS = 'read:users',
  UPDATE_USERS = 'update:users',
  DELETE_USERS = 'delete:users',
  
  // Blog permissions
  READ_BLOG_POSTS = 'read:blog_posts',
  CREATE_BLOG_POSTS = 'create:blog_posts',
  UPDATE_BLOG_POSTS = 'update:blog_posts',
  DELETE_BLOG_POSTS = 'delete:blog_posts',
  PUBLISH_BLOG_POSTS = 'publish:blog_posts',
  
  // Comment permissions
  READ_COMMENTS = 'read:comments',
  CREATE_COMMENTS = 'create:comments',
  UPDATE_COMMENTS = 'update:comments',
  DELETE_COMMENTS = 'delete:comments',
  MODERATE_COMMENTS = 'moderate:comments',
  
  // Email permissions
  READ_EMAIL_CAMPAIGNS = 'read:email_campaigns',
  CREATE_EMAIL_CAMPAIGNS = 'create:email_campaigns',
  UPDATE_EMAIL_CAMPAIGNS = 'update:email_campaigns',
  DELETE_EMAIL_CAMPAIGNS = 'delete:email_campaigns',
  SEND_EMAIL_CAMPAIGNS = 'send:email_campaigns',
  
  // Analytics permissions
  READ_ANALYTICS = 'read:analytics',
  
  // Settings permissions
  READ_SETTINGS = 'read:settings',
  UPDATE_SETTINGS = 'update:settings',
  
  // Audit permissions
  READ_AUDIT_LOGS = 'read:audit_logs',
  
  // Referral permissions
  READ_REFERRALS = 'read:referrals',
  MANAGE_REFERRALS = 'manage:referrals',
  
  // Store credit permissions
  READ_STORE_CREDITS = 'read:store_credits',
  MANAGE_STORE_CREDITS = 'manage:store_credits',
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: [
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_PRODUCTS,
    Permission.READ_BUNDLES,
    Permission.CREATE_ORDERS,
    Permission.READ_ORDERS,
    Permission.READ_DOWNLOADS,
    Permission.CREATE_DOWNLOADS,
    Permission.CREATE_COMMENTS,
    Permission.READ_REFERRALS,
    Permission.READ_STORE_CREDITS,
  ],
  
  admin: [
    // All user permissions
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_PRODUCTS,
    Permission.READ_BUNDLES,
    Permission.CREATE_ORDERS,
    Permission.READ_ORDERS,
    Permission.READ_DOWNLOADS,
    Permission.CREATE_DOWNLOADS,
    Permission.CREATE_COMMENTS,
    Permission.READ_REFERRALS,
    Permission.READ_STORE_CREDITS,
    
    // Admin-specific permissions
    Permission.CREATE_PRODUCTS,
    Permission.UPDATE_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.CREATE_BUNDLES,
    Permission.UPDATE_BUNDLES,
    Permission.DELETE_BUNDLES,
    Permission.UPDATE_ORDERS,
    Permission.READ_COUPONS,
    Permission.CREATE_COUPONS,
    Permission.UPDATE_COUPONS,
    Permission.DELETE_COUPONS,
    Permission.READ_USERS,
    Permission.UPDATE_USERS,
    Permission.CREATE_BLOG_POSTS,
    Permission.UPDATE_BLOG_POSTS,
    Permission.DELETE_BLOG_POSTS,
    Permission.PUBLISH_BLOG_POSTS,
    Permission.READ_COMMENTS,
    Permission.UPDATE_COMMENTS,
    Permission.DELETE_COMMENTS,
    Permission.MODERATE_COMMENTS,
    Permission.READ_EMAIL_CAMPAIGNS,
    Permission.CREATE_EMAIL_CAMPAIGNS,
    Permission.UPDATE_EMAIL_CAMPAIGNS,
    Permission.DELETE_EMAIL_CAMPAIGNS,
    Permission.SEND_EMAIL_CAMPAIGNS,
    Permission.READ_ANALYTICS,
    Permission.READ_SETTINGS,
    Permission.UPDATE_SETTINGS,
    Permission.READ_AUDIT_LOGS,
    Permission.MANAGE_REFERRALS,
    Permission.MANAGE_STORE_CREDITS,
  ],
  
  superadmin: [
    // All user permissions
    Permission.READ_PROFILE,
    Permission.UPDATE_PROFILE,
    Permission.READ_PRODUCTS,
    Permission.READ_BUNDLES,
    Permission.CREATE_ORDERS,
    Permission.READ_ORDERS,
    Permission.READ_DOWNLOADS,
    Permission.CREATE_DOWNLOADS,
    Permission.CREATE_COMMENTS,
    Permission.READ_REFERRALS,
    Permission.READ_STORE_CREDITS,
    
    // All admin permissions
    Permission.CREATE_PRODUCTS,
    Permission.UPDATE_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.CREATE_BUNDLES,
    Permission.UPDATE_BUNDLES,
    Permission.DELETE_BUNDLES,
    Permission.UPDATE_ORDERS,
    Permission.READ_COUPONS,
    Permission.CREATE_COUPONS,
    Permission.UPDATE_COUPONS,
    Permission.DELETE_COUPONS,
    Permission.READ_USERS,
    Permission.UPDATE_USERS,
    Permission.CREATE_BLOG_POSTS,
    Permission.UPDATE_BLOG_POSTS,
    Permission.DELETE_BLOG_POSTS,
    Permission.PUBLISH_BLOG_POSTS,
    Permission.READ_COMMENTS,
    Permission.UPDATE_COMMENTS,
    Permission.DELETE_COMMENTS,
    Permission.MODERATE_COMMENTS,
    Permission.READ_EMAIL_CAMPAIGNS,
    Permission.CREATE_EMAIL_CAMPAIGNS,
    Permission.UPDATE_EMAIL_CAMPAIGNS,
    Permission.DELETE_EMAIL_CAMPAIGNS,
    Permission.SEND_EMAIL_CAMPAIGNS,
    Permission.READ_ANALYTICS,
    Permission.READ_SETTINGS,
    Permission.UPDATE_SETTINGS,
    Permission.READ_AUDIT_LOGS,
    Permission.MANAGE_REFERRALS,
    Permission.MANAGE_STORE_CREDITS,
    
    // Superadmin-specific permissions
    Permission.DELETE_PROFILE,
    Permission.DELETE_ORDERS,
    Permission.DELETE_USERS,
  ],
};

// Check if user has specific permission
export function hasPermission(userRoles: UserRole[], permission: Permission): boolean {
  return userRoles.some(role => ROLE_PERMISSIONS[role].includes(permission));
}

// Check if user has any of the specified permissions
export function hasAnyPermission(userRoles: UserRole[], permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRoles, permission));
}

// Check if user has all of the specified permissions
export function hasAllPermissions(userRoles: UserRole[], permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRoles, permission));
}

// Get all permissions for a user
export function getUserPermissions(userRoles: UserRole[]): Permission[] {
  const permissions = new Set<Permission>();
  
  userRoles.forEach(role => {
    ROLE_PERMISSIONS[role].forEach(permission => {
      permissions.add(permission);
    });
  });
  
  return Array.from(permissions);
}

// Resource-based access control
export interface ResourceContext {
  resourceType: string;
  resourceId?: string;
  resourceOwner?: string;
  userId?: string;
}

// Check if user can access a specific resource
export function canAccessResource(
  userRoles: UserRole[],
  permission: Permission,
  context: ResourceContext
): boolean {
  // Check basic permission
  if (!hasPermission(userRoles, permission)) {
    return false;
  }
  
  // Superadmin can access everything
  if (userRoles.includes('superadmin')) {
    return true;
  }
  
  // Admin can access most resources
  if (userRoles.includes('admin')) {
    return true;
  }
  
  // User can only access their own resources
  if (userRoles.includes('user')) {
    if (context.userId && context.resourceOwner) {
      return context.userId === context.resourceOwner;
    }
    
    // Allow access to public resources
    if (permission === Permission.READ_PRODUCTS || 
        permission === Permission.READ_BUNDLES ||
        permission === Permission.READ_BLOG_POSTS) {
      return true;
    }
  }
  
  return false;
}

// Middleware for permission checking
export function requirePermission(permission: Permission) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const userRoles = args[0]?.roles || [];
      
      if (!hasPermission(userRoles, permission)) {
        throw new Error(`Insufficient permissions. Required: ${permission}`);
      }
      
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}

// Utility functions for common permission checks
export const canReadProducts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_PRODUCTS);
export const canCreateProducts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.CREATE_PRODUCTS);
export const canUpdateProducts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_PRODUCTS);
export const canDeleteProducts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.DELETE_PRODUCTS);

export const canReadBundles = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_BUNDLES);
export const canCreateBundles = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.CREATE_BUNDLES);
export const canUpdateBundles = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_BUNDLES);
export const canDeleteBundles = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.DELETE_BUNDLES);

export const canReadOrders = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_ORDERS);
export const canCreateOrders = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.CREATE_ORDERS);
export const canUpdateOrders = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_ORDERS);
export const canDeleteOrders = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.DELETE_ORDERS);

export const canReadUsers = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_USERS);
export const canUpdateUsers = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_USERS);
export const canDeleteUsers = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.DELETE_USERS);

export const canReadBlogPosts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_BLOG_POSTS);
export const canCreateBlogPosts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.CREATE_BLOG_POSTS);
export const canUpdateBlogPosts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_BLOG_POSTS);
export const canDeleteBlogPosts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.DELETE_BLOG_POSTS);
export const canPublishBlogPosts = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.PUBLISH_BLOG_POSTS);

export const canModerateComments = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.MODERATE_COMMENTS);
export const canCreateComments = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.CREATE_COMMENTS);

export const canReadAnalytics = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_ANALYTICS);
export const canReadSettings = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_SETTINGS);
export const canUpdateSettings = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.UPDATE_SETTINGS);

export const canReadAuditLogs = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.READ_AUDIT_LOGS);

export const canManageReferrals = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.MANAGE_REFERRALS);
export const canManageStoreCredits = (userRoles: UserRole[]) => hasPermission(userRoles, Permission.MANAGE_STORE_CREDITS);

// Admin dashboard access
export const canAccessAdminDashboard = (userRoles: UserRole[]) => {
  return hasAnyPermission(userRoles, [
    Permission.READ_PRODUCTS,
    Permission.READ_ORDERS,
    Permission.READ_USERS,
    Permission.READ_BLOG_POSTS,
    Permission.READ_ANALYTICS,
  ]);
};

// Super admin only functions
export const isSuperAdminOnly = (userRoles: UserRole[]) => {
  return userRoles.includes('superadmin') && userRoles.length === 1;
};

// Admin or super admin functions
export const isAdminOrSuperAdmin = (userRoles: UserRole[]) => {
  return userRoles.includes('admin') || userRoles.includes('superadmin');
};

// Require admin access (for server-side use)
export async function requireAdmin(user: any) {
  if (!user) {
    throw new Error('User not authenticated');
  }
  
  const userRoles = user.roles || [];
  
  if (!isAdminOrSuperAdmin(userRoles)) {
    throw new Error('Admin access required');
  }
  
  return user;
}
