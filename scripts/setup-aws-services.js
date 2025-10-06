const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = util.promisify(exec);

// AWS Services setup script for NYASC platform
async function setupAWSServices() {
  console.log('☁️  Setting up AWS Services for NYASC Platform...\n');

  try {
    // 1. Create DynamoDB table
    console.log('💾 Creating DynamoDB table...');
    const createTableCommand = `
      aws dynamodb create-table \
        --table-name nyasc-platform \
        --attribute-definitions \
          AttributeName=PK,AttributeType=S \
          AttributeName=SK,AttributeType=S \
          AttributeName=GSI1PK,AttributeType=S \
          AttributeName=GSI1SK,AttributeType=S \
          AttributeName=GSI2PK,AttributeType=S \
          AttributeName=GSI2SK,AttributeType=S \
          AttributeName=GSI3PK,AttributeType=S \
          AttributeName=GSI3SK,AttributeType=S \
          AttributeName=GSI4PK,AttributeType=S \
          AttributeName=GSI4SK,AttributeType=S \
        --key-schema \
          AttributeName=PK,KeyType=HASH \
          AttributeName=SK,KeyType=RANGE \
        --global-secondary-indexes \
          IndexName=GSI1,KeySchema=[{AttributeName=GSI1PK,KeyType=HASH},{AttributeName=GSI1SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
          IndexName=GSI2,KeySchema=[{AttributeName=GSI2PK,KeyType=HASH},{AttributeName=GSI2SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
          IndexName=GSI3,KeySchema=[{AttributeName=GSI3PK,KeyType=HASH},{AttributeName=GSI3SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
          IndexName=GSI4,KeySchema=[{AttributeName=GSI4PK,KeyType=HASH},{AttributeName=GSI4SK,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5} \
        --billing-mode PAY_PER_REQUEST \
        --region us-east-1
    `;
    
    try {
      await execAsync(createTableCommand);
      console.log('✅ DynamoDB table created\n');
    } catch (error) {
      if (error.message.includes('ResourceInUseException')) {
        console.log('✅ DynamoDB table already exists\n');
      } else {
        throw error;
      }
    }

    // 2. Create S3 bucket
    console.log('🪣 Creating S3 bucket...');
    const bucketName = 'nyasc-platform-assets';
    const createBucketCommand = `aws s3 mb s3://${bucketName} --region us-east-1`;
    
    try {
      await execAsync(createBucketCommand);
      console.log('✅ S3 bucket created\n');
    } catch (error) {
      if (error.message.includes('BucketAlreadyOwnedByYou')) {
        console.log('✅ S3 bucket already exists\n');
      } else {
        throw error;
      }
    }

    // 3. Configure S3 bucket policy
    console.log('🔒 Configuring S3 bucket policy...');
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicReadGetObject',
          Effect: 'Allow',
          Principal: '*',
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${bucketName}/public/*`
        },
        {
          Sid: 'PrivateAccess',
          Effect: 'Allow',
          Principal: {
            AWS: 'arn:aws:iam::YOUR_ACCOUNT_ID:root'
          },
          Action: 's3:*',
          Resource: `arn:aws:s3:::${bucketName}/*`
        }
      ]
    };

    fs.writeFileSync('/tmp/bucket-policy.json', JSON.stringify(bucketPolicy, null, 2));
    await execAsync(`aws s3api put-bucket-policy --bucket ${bucketName} --policy file:///tmp/bucket-policy.json`);
    console.log('✅ S3 bucket policy configured\n');

    // 4. Create Cognito User Pool
    console.log('🔐 Creating Cognito User Pool...');
    const createUserPoolCommand = `
      aws cognito-idp create-user-pool \
        --pool-name nyasc-user-pool \
        --policies '{
          "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireUppercase": true,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": true
          }
        }' \
        --auto-verified-attributes email \
        --username-attributes email \
        --region us-east-1
    `;
    
    try {
      const { stdout } = await execAsync(createUserPoolCommand);
      const userPool = JSON.parse(stdout);
      const userPoolId = userPool.UserPool.Id;
      console.log(`✅ Cognito User Pool created: ${userPoolId}\n`);
      
      // Create User Pool Client
      const createClientCommand = `
        aws cognito-idp create-user-pool-client \
          --user-pool-id ${userPoolId} \
          --client-name nyasc-client \
          --generate-secret \
          --explicit-auth-flows USER_PASSWORD_AUTH ALLOW_USER_SRP_AUTH \
          --supported-identity-providers COGNITO \
          --region us-east-1
      `;
      
      const { stdout: clientOutput } = await execAsync(createClientCommand);
      const client = JSON.parse(clientOutput);
      console.log(`✅ Cognito Client created: ${client.UserPoolClient.ClientId}\n`);
      
      // Create groups
      await execAsync(`aws cognito-idp create-group --user-pool-id ${userPoolId} --group-name superadmin --description "Super Admin Group" --region us-east-1`);
      await execAsync(`aws cognito-idp create-group --user-pool-id ${userPoolId} --group-name admin --description "Admin Group" --region us-east-1`);
      await execAsync(`aws cognito-idp create-group --user-pool-id ${userPoolId} --group-name user --description "User Group" --region us-east-1`);
      console.log('✅ Cognito groups created\n');
      
    } catch (error) {
      if (error.message.includes('UserPoolAlreadyExists')) {
        console.log('✅ Cognito User Pool already exists\n');
      } else {
        throw error;
      }
    }

    // 5. Set up SES
    console.log('📧 Setting up SES...');
    try {
      await execAsync('aws ses verify-domain-identity --domain nyasc-counselor.com --region us-east-1');
      console.log('✅ SES domain verification initiated\n');
    } catch (error) {
      console.log('⚠️  SES setup requires manual verification\n');
    }

    // 6. Create IAM role for Amplify
    console.log('🔑 Creating IAM role for Amplify...');
    const trustPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            Service: 'amplify.amazonaws.com'
          },
          Action: 'sts:AssumeRole'
        }
      ]
    };

    const rolePolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: [
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
            'dynamodb:Query',
            'dynamodb:Scan',
            's3:GetObject',
            's3:PutObject',
            's3:DeleteObject',
            'cognito-idp:AdminGetUser',
            'cognito-idp:AdminCreateUser',
            'cognito-idp:AdminUpdateUserAttributes',
            'cognito-idp:AdminDeleteUser',
            'ses:SendEmail',
            'ses:SendRawEmail'
          ],
          Resource: '*'
        }
      ]
    };

    fs.writeFileSync('/tmp/trust-policy.json', JSON.stringify(trustPolicy, null, 2));
    fs.writeFileSync('/tmp/role-policy.json', JSON.stringify(rolePolicy, null, 2));
    
    try {
      await execAsync('aws iam create-role --role-name NYASC-Amplify-Role --assume-role-policy-document file:///tmp/trust-policy.json');
      await execAsync('aws iam put-role-policy --role-name NYASC-Amplify-Role --policy-name NYASC-Amplify-Policy --policy-document file:///tmp/role-policy.json');
      console.log('✅ IAM role created\n');
    } catch (error) {
      if (error.message.includes('EntityAlreadyExists')) {
        console.log('✅ IAM role already exists\n');
      } else {
        throw error;
      }
    }

    console.log('🎉 AWS Services Setup Completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy to Amplify');
    console.log('2. Configure environment variables');
    console.log('3. Set up superadmin accounts');
    console.log('4. Test all functionality');

  } catch (error) {
    console.error('❌ AWS Services setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check AWS credentials: aws configure');
    console.log('2. Verify permissions: aws sts get-caller-identity');
    console.log('3. Check region: aws configure get region');
  }
}

// Run the setup
if (require.main === module) {
  setupAWSServices().catch(console.error);
}

module.exports = { setupAWSServices };
