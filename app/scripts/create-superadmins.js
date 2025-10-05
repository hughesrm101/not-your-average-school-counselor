const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand, AdminSetUserPasswordCommand } = require('@aws-sdk/client-cognito-identity-provider');

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID || 'us-east-1_Nb05aFy5j';
const SUPERADMIN_GROUP = 'superadmin';

async function createSuperAdmin(email, temporaryPassword = 'TempPass123!') {
  try {
    console.log(`Creating superadmin user: ${email}`);

    // Create user
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        {
          Name: 'given_name',
          Value: email.includes('hughesrm101') ? 'Richard' : 'NYASC',
        },
        {
          Name: 'family_name',
          Value: email.includes('hughesrm101') ? 'Hughes' : 'Admin',
        },
      ],
      TemporaryPassword: temporaryPassword,
      MessageAction: 'SUPPRESS', // Don't send welcome email
    });

    const createUserResult = await cognitoClient.send(createUserCommand);
    console.log(`✅ User created: ${email}`);

    // Set permanent password
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: temporaryPassword,
      Permanent: true,
    });

    await cognitoClient.send(setPasswordCommand);
    console.log(`✅ Password set for: ${email}`);

    // Add to superadmin group
    const addToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      GroupName: SUPERADMIN_GROUP,
    });

    await cognitoClient.send(addToGroupCommand);
    console.log(`✅ Added to superadmin group: ${email}`);

    return {
      success: true,
      email,
      temporaryPassword,
      message: `Superadmin created successfully. Login with: ${email} / ${temporaryPassword}`
    };

  } catch (error) {
    if (error.name === 'UsernameExistsException') {
      console.log(`⚠️  User already exists: ${email}`);
      
      // Try to add existing user to superadmin group
      try {
        const addToGroupCommand = new AdminAddUserToGroupCommand({
          UserPoolId: USER_POOL_ID,
          Username: email,
          GroupName: SUPERADMIN_GROUP,
        });

        await cognitoClient.send(addToGroupCommand);
        console.log(`✅ Added existing user to superadmin group: ${email}`);
        
        return {
          success: true,
          email,
          message: `Existing user added to superadmin group: ${email}`
        };
      } catch (groupError) {
        console.error(`❌ Error adding to group: ${groupError.message}`);
        return {
          success: false,
          email,
          error: groupError.message
        };
      }
    } else {
      console.error(`❌ Error creating user ${email}:`, error.message);
      return {
        success: false,
        email,
        error: error.message
      };
    }
  }
}

async function main() {
  console.log('🚀 Creating NYASC Superadmin Users...\n');

  const superadminEmails = [
    'hughesrm101@gmail.com',
    'notyouraverageschoolcounselor@gmail.com'
  ];

  const results = [];

  for (const email of superadminEmails) {
    const result = await createSuperAdmin(email);
    results.push(result);
    console.log(''); // Empty line for readability
  }

  console.log('📋 Summary:');
  console.log('===========');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.email}: ${result.message}`);
      if (result.temporaryPassword) {
        console.log(`   Login: ${result.email} / ${result.temporaryPassword}`);
      }
    } else {
      console.log(`❌ ${result.email}: ${result.error}`);
    }
  });

  console.log('\n🎯 Next Steps:');
  console.log('1. Login to your admin dashboard at /admin');
  console.log('2. Change your password in the user settings');
  console.log('3. Start adding products and managing your store!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createSuperAdmin };
