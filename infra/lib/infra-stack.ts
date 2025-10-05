import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as ses from 'aws-cdk-lib/aws-ses';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';

export class NyascInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Domain configuration
    const domainName = 'yourdomain.com';
    const hostedZoneId = 'Z1234567890'; // Replace with actual hosted zone ID

    // Get hosted zone
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      zoneName: domainName,
      hostedZoneId: hostedZoneId,
    });

    // SSL Certificate
    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: domainName,
      subjectAlternativeNames: [`*.${domainName}`],
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // Secrets Manager for sensitive data
    const secrets = new secretsmanager.Secret(this, 'NyascSecrets', {
      description: 'NYASC application secrets',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          stripeSecretKey: 'sk_test_placeholder',
          meiliMasterKey: 'placeholder_master_key',
        }),
        generateStringKey: 'randomKey',
        excludeCharacters: '"@/\\',
      },
    });

    // Cognito User Pool
    const userPool = new cognito.UserPool(this, 'NyascUserPool', {
      userPoolName: 'nyasc-users',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Cognito User Pool Client
    const userPoolClient = new cognito.UserPoolClient(this, 'NyascUserPoolClient', {
      userPool,
      userPoolClientName: 'nyasc-web-client',
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true,
        adminUserPassword: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: [
          'http://localhost:3000/auth/callback',
          `https://${domainName}/auth/callback`,
          `https://www.${domainName}/auth/callback`,
        ],
        logoutUrls: [
          'http://localhost:3000/',
          `https://${domainName}/`,
          `https://www.${domainName}/`,
        ],
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    // Cognito User Pool Domain
    const userPoolDomain = new cognito.UserPoolDomain(this, 'NyascUserPoolDomain', {
      userPool,
      cognitoDomain: {
        domainPrefix: 'nyasc-auth',
      },
    });

    // Cognito Identity Pool
    const identityPool = new cognito.CfnIdentityPool(this, 'NyascIdentityPool', {
      identityPoolName: 'nyasc_identity_pool',
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    // IAM roles for Cognito
    const authenticatedRole = new iam.Role(this, 'CognitoAuthenticatedRole', {
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity'
      ),
    });

    // Attach policies to authenticated role
    authenticatedRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
        'dynamodb:Query',
        'dynamodb:Scan',
      ],
      resources: ['*'], // Will be restricted to specific table
    }));

    new cognito.CfnIdentityPoolRoleAttachment(this, 'IdentityPoolRoleAttachment', {
      identityPoolId: identityPool.ref,
      roles: {
        authenticated: authenticatedRole.roleArn,
      },
    });

    // Cognito Groups
    const superAdminGroup = new cognito.CfnUserPoolGroup(this, 'SuperAdminGroup', {
      userPoolId: userPool.userPoolId,
      groupName: 'superadmin',
      description: 'Super administrators with full access',
      precedence: 1,
    });

    const adminGroup = new cognito.CfnUserPoolGroup(this, 'AdminGroup', {
      userPoolId: userPool.userPoolId,
      groupName: 'admin',
      description: 'Administrators with limited access',
      precedence: 2,
    });

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'NyascMainTable', {
      tableName: 'nyasc-main-table',
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: true,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // Global Secondary Indexes
    table.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: {
        name: 'GSI1PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI1SK',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'GSI2',
      partitionKey: {
        name: 'GSI2PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI2SK',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'GSI3',
      partitionKey: {
        name: 'GSI3PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI3SK',
        type: dynamodb.AttributeType.STRING,
      },
    });

    table.addGlobalSecondaryIndex({
      indexName: 'GSI4',
      partitionKey: {
        name: 'GSI4PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'GSI4SK',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // S3 Buckets
    const privateBucket = new s3.Bucket(this, 'NyascPrivateBucket', {
      bucketName: `nyasc-private-products-${this.account}-${this.region}`,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      lifecycleRules: [
        {
          id: 'DeleteIncompleteMultipartUploads',
          abortIncompleteMultipartUploadAfter: cdk.Duration.days(1),
        },
      ],
    });

    const publicBucket = new s3.Bucket(this, 'NyascPublicBucket', {
      bucketName: `nyasc-public-assets-${this.account}-${this.region}`,
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        },
      ],
    });

    // CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'NyascDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(publicBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },
      domainNames: [domainName, `www.${domainName}`],
      certificate: certificate,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: 'NYASC Platform CDN',
    });

    // Route 53 Records
    new route53.ARecord(this, 'DomainRecord', {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      ),
    });

    new route53.ARecord(this, 'WwwDomainRecord', {
      zone: hostedZone,
      recordName: `www.${domainName}`,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      ),
    });

    // SES Configuration
    const sesIdentity = new ses.EmailIdentity(this, 'NyascSesIdentity', {
      identity: ses.Identity.domain(domainName),
      mailFromDomain: `mail.${domainName}`,
    });

    // SQS Queues
    const emailQueue = new sqs.Queue(this, 'EmailQueue', {
      queueName: 'nyasc-email-queue',
      visibilityTimeout: cdk.Duration.minutes(5),
      retentionPeriod: cdk.Duration.days(14),
      deadLetterQueue: {
        queue: new sqs.Queue(this, 'EmailDLQ', {
          queueName: 'nyasc-email-dlq',
          retentionPeriod: cdk.Duration.days(14),
        }),
        maxReceiveCount: 3,
      },
    });

    const searchIndexQueue = new sqs.Queue(this, 'SearchIndexQueue', {
      queueName: 'nyasc-search-index-queue',
      visibilityTimeout: cdk.Duration.minutes(2),
      retentionPeriod: cdk.Duration.days(7),
    });

    // EventBridge Rules
    const dailySitemapRule = new events.Rule(this, 'DailySitemapRule', {
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '2',
        day: '*',
        month: '*',
        year: '*',
      }),
      description: 'Generate sitemap daily at 2 AM',
    });

    const abandonedCartRule = new events.Rule(this, 'AbandonedCartRule', {
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '*/6',
        day: '*',
        month: '*',
        year: '*',
      }),
      description: 'Check for abandoned carts every 6 hours',
    });

    // VPC for Meilisearch
    const vpc = new ec2.Vpc(this, 'NyascVpc', {
      maxAzs: 2,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
    });

    // Security Group for Meilisearch
    const meiliSecurityGroup = new ec2.SecurityGroup(this, 'MeiliSecurityGroup', {
      vpc,
      description: 'Security group for Meilisearch instance',
      allowAllOutbound: true,
    });

    meiliSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(7700),
      'Allow Meilisearch HTTP access'
    );

    // Meilisearch EC2 Instance
    const meiliInstance = new ec2.Instance(this, 'MeilisearchInstance', {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: meiliSecurityGroup,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      userData: ec2.UserData.forLinux(),
      role: new iam.Role(this, 'MeiliInstanceRole', {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
        ],
      }),
    });

    // Outputs
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: userPool.userPoolId,
      description: 'Cognito User Pool ID',
      exportName: 'NyascUserPoolId',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: userPoolClient.userPoolClientId,
      description: 'Cognito User Pool Client ID',
      exportName: 'NyascUserPoolClientId',
    });

    new cdk.CfnOutput(this, 'UserPoolDomain', {
      value: userPoolDomain.domainName,
      description: 'Cognito User Pool Domain',
      exportName: 'NyascUserPoolDomain',
    });

    new cdk.CfnOutput(this, 'IdentityPoolId', {
      value: identityPool.ref,
      description: 'Cognito Identity Pool ID',
      exportName: 'NyascIdentityPoolId',
    });

    new cdk.CfnOutput(this, 'DynamoTableName', {
      value: table.tableName,
      description: 'DynamoDB Table Name',
      exportName: 'NyascDynamoTableName',
    });

    new cdk.CfnOutput(this, 'PrivateBucketName', {
      value: privateBucket.bucketName,
      description: 'S3 Private Bucket Name',
      exportName: 'NyascPrivateBucketName',
    });

    new cdk.CfnOutput(this, 'PublicBucketName', {
      value: publicBucket.bucketName,
      description: 'S3 Public Bucket Name',
      exportName: 'NyascPublicBucketName',
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront Distribution ID',
      exportName: 'NyascCloudFrontDistributionId',
    });

    new cdk.CfnOutput(this, 'CloudFrontDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront Distribution Domain Name',
      exportName: 'NyascCloudFrontDomainName',
    });

    new cdk.CfnOutput(this, 'SesSenderEmail', {
      value: `hi@${domainName}`,
      description: 'SES Sender Email',
      exportName: 'NyascSesSenderEmail',
    });

    new cdk.CfnOutput(this, 'EmailQueueUrl', {
      value: emailQueue.queueUrl,
      description: 'SQS Email Queue URL',
      exportName: 'NyascEmailQueueUrl',
    });

    new cdk.CfnOutput(this, 'MeiliInstanceId', {
      value: meiliInstance.instanceId,
      description: 'Meilisearch Instance ID',
      exportName: 'NyascMeiliInstanceId',
    });

    new cdk.CfnOutput(this, 'SecretsArn', {
      value: secrets.secretArn,
      description: 'Secrets Manager ARN',
      exportName: 'NyascSecretsArn',
    });
  }
}
