# 🔐 Superadmin Setup Guide

## **Creating Superadmin Accounts**

### **Method 1: Using the Script (Recommended)**

1. **Navigate to scripts directory:**
   ```bash
   cd app/scripts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the scripts directory:
   ```env
   AWS_REGION=us-east-1
   COGNITO_USER_POOL_ID=your-user-pool-id
   COGNITO_CLIENT_ID=your-client-id
   ```

4. **Run the superadmin creation script:**
   ```bash
   npm run create-superadmins
   ```

### **Method 2: Manual AWS Console Setup**

1. **Go to AWS Cognito Console**
2. **Select your User Pool**
3. **Go to Users tab**
4. **Click "Create user"**
5. **Fill in details:**
   - Username: `hughesrm101@gmail.com`
   - Email: `hughesrm101@gmail.com`
   - Temporary password: `TempPass123!`
   - Mark email as verified
6. **Go to Groups tab**
7. **Add user to `superadmin` group**

### **Method 3: Using AWS CLI**

```bash
# Create user
aws cognito-idp admin-create-user \
  --user-pool-id YOUR_USER_POOL_ID \
  --username hughesrm101@gmail.com \
  --user-attributes Name=email,Value=hughesrm101@gmail.com Name=email_verified,Value=true \
  --temporary-password TempPass123! \
  --message-action SUPPRESS

# Add to superadmin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id YOUR_USER_POOL_ID \
  --username hughesrm101@gmail.com \
  --group-name superadmin
```

## **Superadmin Login Credentials**

After running the script, you'll have these superadmin accounts:

### **Account 1:**
- **Email:** `hughesrm101@gmail.com`
- **Password:** `TempPass123!`
- **Role:** Superadmin

### **Account 2:**
- **Email:** `notyouraverageschoolcounselor@gmail.com`
- **Password:** `TempPass123!`
- **Role:** Superadmin

## **First Login Steps**

1. **Go to your admin dashboard:** `https://yourdomain.com/admin`
2. **Login with the credentials above**
3. **Change your password immediately:**
   - Go to user settings
   - Update password to something secure
4. **Start managing your store!**

## **Superadmin Permissions**

Superadmins have access to:

- ✅ **All Products** - Create, edit, delete, manage
- ✅ **All Orders** - View, process, refund
- ✅ **All Users** - Manage user accounts
- ✅ **Blog Posts** - Create, edit, publish, schedule
- ✅ **Email Campaigns** - Send, manage, track
- ✅ **Analytics** - View all reports and data
- ✅ **Settings** - Configure platform settings
- ✅ **System Management** - Full admin access

## **Security Best Practices**

1. **Change default passwords immediately**
2. **Enable MFA for superadmin accounts**
3. **Use strong, unique passwords**
4. **Regularly review admin access**
5. **Monitor admin activity logs**

---

# 💳 Stripe Pricing & Product Updates

## **How Stripe Pricing Works**

### **✅ YES - Stripe Automatically Adjusts to Price Changes**

When you update a product price in your admin dashboard:

1. **Immediate Effect:** The new price is instantly reflected on your website
2. **Stripe Integration:** Your Stripe checkout sessions use the current price
3. **No Manual Updates Needed:** Stripe pulls the price from your database in real-time

### **How It Works:**

```javascript
// When creating a Stripe checkout session
const checkoutSession = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.shortDescription,
        },
        unit_amount: product.price * 100, // Price from your database
      },
      quantity: 1,
    },
  ],
  // ... other options
});
```

### **Price Update Flow:**

1. **Admin updates price** in dashboard
2. **Database is updated** with new price
3. **Next customer checkout** uses new price automatically
4. **No Stripe configuration needed**

## **Important Notes:**

### **✅ What Updates Automatically:**
- Product prices
- Product names
- Product descriptions
- Product availability
- Discount codes
- Tax settings

### **⚠️ What Requires Stripe Setup:**
- **Payment methods** (cards, Apple Pay, etc.)
- **Tax rates** (if using Stripe Tax)
- **Webhook endpoints**
- **Refund policies**

## **Testing Price Changes:**

1. **Update a product price** in admin dashboard
2. **Go to your shop page**
3. **Add product to cart**
4. **Proceed to checkout**
5. **Verify new price** appears in Stripe checkout

## **Bulk Price Updates:**

You can update multiple product prices at once:

1. **Go to Products page** in admin
2. **Select multiple products**
3. **Use bulk actions** to update prices
4. **All changes apply immediately**

## **Price History:**

Your platform tracks price changes:
- **Previous prices** are logged
- **Change timestamps** are recorded
- **Admin who made changes** is tracked
- **Price change history** is available in admin dashboard

---

# 🚀 Ready to Go Live!

Your superadmin accounts are ready and Stripe pricing is fully automated. You can:

1. **Login as superadmin**
2. **Add your products**
3. **Set your prices**
4. **Start selling immediately**

**Stripe will handle all pricing automatically!** 💳✨
