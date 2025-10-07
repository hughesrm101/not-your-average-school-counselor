"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NyascInfrastructureStack = void 0;
const cdk = require("aws-cdk-lib");
const cognito = require("aws-cdk-lib/aws-cognito");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const s3 = require("aws-cdk-lib/aws-s3");
const cloudfront = require("aws-cdk-lib/aws-cloudfront");
const origins = require("aws-cdk-lib/aws-cloudfront-origins");
const ses = require("aws-cdk-lib/aws-ses");
const sqs = require("aws-cdk-lib/aws-sqs");
const events = require("aws-cdk-lib/aws-events");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");
const iam = require("aws-cdk-lib/aws-iam");
const ec2 = require("aws-cdk-lib/aws-ec2");
const route53 = require("aws-cdk-lib/aws-route53");
const route53targets = require("aws-cdk-lib/aws-route53-targets");
const acm = require("aws-cdk-lib/aws-certificatemanager");
class NyascInfrastructureStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            assumedBy: new iam.FederatedPrincipal('cognito-identity.amazonaws.com', {
                StringEquals: {
                    'cognito-identity.amazonaws.com:aud': identityPool.ref,
                },
                'ForAnyValue:StringLike': {
                    'cognito-identity.amazonaws.com:amr': 'authenticated',
                },
            }, 'sts:AssumeRoleWithWebIdentity'),
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
            target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(distribution)),
        });
        new route53.ARecord(this, 'WwwDomainRecord', {
            zone: hostedZone,
            recordName: `www.${domainName}`,
            target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(distribution)),
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
        meiliSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(7700), 'Allow Meilisearch HTTP access');
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
exports.NyascInfrastructureStack = NyascInfrastructureStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsbURBQW1EO0FBQ25ELHFEQUFxRDtBQUNyRCx5Q0FBeUM7QUFDekMseURBQXlEO0FBQ3pELDhEQUE4RDtBQUM5RCwyQ0FBMkM7QUFDM0MsMkNBQTJDO0FBQzNDLGlEQUFpRDtBQUVqRCxpRUFBaUU7QUFDakUsMkNBQTJDO0FBRTNDLDJDQUEyQztBQUMzQyxtREFBbUQ7QUFDbkQsa0VBQWtFO0FBQ2xFLDBEQUEwRDtBQUcxRCxNQUFhLHdCQUF5QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3JELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsdUJBQXVCO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDO1FBQ3BDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQyxDQUFDLHFDQUFxQztRQUV6RSxrQkFBa0I7UUFDbEIsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ2pGLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFlBQVksRUFBRSxZQUFZO1NBQzNCLENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUMzRCxVQUFVLEVBQUUsVUFBVTtZQUN0Qix1QkFBdUIsRUFBRSxDQUFDLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDNUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1NBQzFELENBQUMsQ0FBQztRQUVILHFDQUFxQztRQUNyQyxN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QVUsRUFBRSwrQkFBK0I7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUM5QyxLQUFLLEVBQUUsWUFBWSxDQUFDLHNCQUFzQjtZQUMxQyxXQUFXLEVBQUUscUNBQXFDO1lBQ2xELFVBQVUsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4QyxLQUFLLEVBQUUsTUFBTSxVQUFVLEVBQUU7WUFDekIsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixVQUFVLEVBQUUscUJBQXFCO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3ZDLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUTtZQUMxQixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLFVBQVUsRUFBRSxvQkFBb0I7U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN6QyxLQUFLLEVBQUUsYUFBYSxDQUFDLFVBQVU7WUFDL0IsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxVQUFVLEVBQUUsc0JBQXNCO1NBQ25DLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3BDLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUztZQUN4QixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLFVBQVUsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBamVELDREQWllQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2duaXRvJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCc7XG5pbXBvcnQgKiBhcyBvcmlnaW5zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1jbG91ZGZyb250LW9yaWdpbnMnO1xuaW1wb3J0ICogYXMgc2VzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zZXMnO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuaW1wb3J0ICogYXMgZXZlbnRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1ldmVudHMnO1xuaW1wb3J0ICogYXMgdGFyZ2V0cyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZXZlbnRzLXRhcmdldHMnO1xuaW1wb3J0ICogYXMgc2VjcmV0c21hbmFnZXIgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNlY3JldHNtYW5hZ2VyJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCAqIGFzIHJvdXRlNTMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMnO1xuaW1wb3J0ICogYXMgcm91dGU1M3RhcmdldHMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXJvdXRlNTMtdGFyZ2V0cyc7XG5pbXBvcnQgKiBhcyBhY20gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNlcnRpZmljYXRlbWFuYWdlcic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIE55YXNjSW5mcmFzdHJ1Y3R1cmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIERvbWFpbiBjb25maWd1cmF0aW9uXG4gICAgY29uc3QgZG9tYWluTmFtZSA9ICd5b3VyZG9tYWluLmNvbSc7XG4gICAgY29uc3QgaG9zdGVkWm9uZUlkID0gJ1oxMjM0NTY3ODkwJzsgLy8gUmVwbGFjZSB3aXRoIGFjdHVhbCBob3N0ZWQgem9uZSBJRFxuXG4gICAgLy8gR2V0IGhvc3RlZCB6b25lXG4gICAgY29uc3QgaG9zdGVkWm9uZSA9IHJvdXRlNTMuSG9zdGVkWm9uZS5mcm9tSG9zdGVkWm9uZUF0dHJpYnV0ZXModGhpcywgJ0hvc3RlZFpvbmUnLCB7XG4gICAgICB6b25lTmFtZTogZG9tYWluTmFtZSxcbiAgICAgIGhvc3RlZFpvbmVJZDogaG9zdGVkWm9uZUlkLFxuICAgIH0pO1xuXG4gICAgLy8gU1NMIENlcnRpZmljYXRlXG4gICAgY29uc3QgY2VydGlmaWNhdGUgPSBuZXcgYWNtLkNlcnRpZmljYXRlKHRoaXMsICdDZXJ0aWZpY2F0ZScsIHtcbiAgICAgIGRvbWFpbk5hbWU6IGRvbWFpbk5hbWUsXG4gICAgICBzdWJqZWN0QWx0ZXJuYXRpdmVOYW1lczogW2AqLiR7ZG9tYWluTmFtZX1gXSxcbiAgICAgIHZhbGlkYXRpb246IGFjbS5DZXJ0aWZpY2F0ZVZhbGlkYXRpb24uZnJvbURucyhob3N0ZWRab25lKSxcbiAgICB9KTtcblxuICAgIC8vIFNlY3JldHMgTWFuYWdlciBmb3Igc2Vuc2l0aXZlIGRhdGFcbiAgICBjb25zdCBzZWNyZXRzID0gbmV3IHNlY3JldHNtYW5hZ2VyLlNlY3JldCh0aGlzLCAnTnlhc2NTZWNyZXRzJywge1xuICAgICAgZGVzY3JpcHRpb246ICdOWUFTQyBhcHBsaWNhdGlvbiBzZWNyZXRzJyxcbiAgICAgIGdlbmVyYXRlU2VjcmV0U3RyaW5nOiB7XG4gICAgICAgIHNlY3JldFN0cmluZ1RlbXBsYXRlOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgc3RyaXBlU2VjcmV0S2V5OiAnc2tfdGVzdF9wbGFjZWhvbGRlcicsXG4gICAgICAgICAgbWVpbGlNYXN0ZXJLZXk6ICdwbGFjZWhvbGRlcl9tYXN0ZXJfa2V5JyxcbiAgICAgICAgfSksXG4gICAgICAgIGdlbmVyYXRlU3RyaW5nS2V5OiAncmFuZG9tS2V5JyxcbiAgICAgICAgZXhjbHVkZUNoYXJhY3RlcnM6ICdcIkAvXFxcXCcsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ29nbml0byBVc2VyIFBvb2xcbiAgICBjb25zdCB1c2VyUG9vbCA9IG5ldyBjb2duaXRvLlVzZXJQb29sKHRoaXMsICdOeWFzY1VzZXJQb29sJywge1xuICAgICAgdXNlclBvb2xOYW1lOiAnbnlhc2MtdXNlcnMnLFxuICAgICAgc2VsZlNpZ25VcEVuYWJsZWQ6IHRydWUsXG4gICAgICBzaWduSW5BbGlhc2VzOiB7XG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICB9LFxuICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZ2l2ZW5OYW1lOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZmFtaWx5TmFtZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgbWluTGVuZ3RoOiA4LFxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlVXBwZXJjYXNlOiB0cnVlLFxuICAgICAgICByZXF1aXJlRGlnaXRzOiB0cnVlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBhY2NvdW50UmVjb3Zlcnk6IGNvZ25pdG8uQWNjb3VudFJlY292ZXJ5LkVNQUlMX09OTFksXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5SRVRBSU4sXG4gICAgfSk7XG5cbiAgICAvLyBDb2duaXRvIFVzZXIgUG9vbCBDbGllbnRcbiAgICBjb25zdCB1c2VyUG9vbENsaWVudCA9IG5ldyBjb2duaXRvLlVzZXJQb29sQ2xpZW50KHRoaXMsICdOeWFzY1VzZXJQb29sQ2xpZW50Jywge1xuICAgICAgdXNlclBvb2wsXG4gICAgICB1c2VyUG9vbENsaWVudE5hbWU6ICdueWFzYy13ZWItY2xpZW50JyxcbiAgICAgIGdlbmVyYXRlU2VjcmV0OiBmYWxzZSxcbiAgICAgIGF1dGhGbG93czoge1xuICAgICAgICB1c2VyUGFzc3dvcmQ6IHRydWUsXG4gICAgICAgIHVzZXJTcnA6IHRydWUsXG4gICAgICAgIGFkbWluVXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIG9BdXRoOiB7XG4gICAgICAgIGZsb3dzOiB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvbkNvZGVHcmFudDogdHJ1ZSxcbiAgICAgICAgICBpbXBsaWNpdENvZGVHcmFudDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgc2NvcGVzOiBbXG4gICAgICAgICAgY29nbml0by5PQXV0aFNjb3BlLkVNQUlMLFxuICAgICAgICAgIGNvZ25pdG8uT0F1dGhTY29wZS5PUEVOSUQsXG4gICAgICAgICAgY29nbml0by5PQXV0aFNjb3BlLlBST0ZJTEUsXG4gICAgICAgIF0sXG4gICAgICAgIGNhbGxiYWNrVXJsczogW1xuICAgICAgICAgICdodHRwOi8vbG9jYWxob3N0OjMwMDAvYXV0aC9jYWxsYmFjaycsXG4gICAgICAgICAgYGh0dHBzOi8vJHtkb21haW5OYW1lfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgICBgaHR0cHM6Ly93d3cuJHtkb21haW5OYW1lfS9hdXRoL2NhbGxiYWNrYCxcbiAgICAgICAgXSxcbiAgICAgICAgbG9nb3V0VXJsczogW1xuICAgICAgICAgICdodHRwOi8vbG9jYWxob3N0OjMwMDAvJyxcbiAgICAgICAgICBgaHR0cHM6Ly8ke2RvbWFpbk5hbWV9L2AsXG4gICAgICAgICAgYGh0dHBzOi8vd3d3LiR7ZG9tYWluTmFtZX0vYCxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBzdXBwb3J0ZWRJZGVudGl0eVByb3ZpZGVyczogW1xuICAgICAgICBjb2duaXRvLlVzZXJQb29sQ2xpZW50SWRlbnRpdHlQcm92aWRlci5DT0dOSVRPLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIC8vIENvZ25pdG8gVXNlciBQb29sIERvbWFpblxuICAgIGNvbnN0IHVzZXJQb29sRG9tYWluID0gbmV3IGNvZ25pdG8uVXNlclBvb2xEb21haW4odGhpcywgJ055YXNjVXNlclBvb2xEb21haW4nLCB7XG4gICAgICB1c2VyUG9vbCxcbiAgICAgIGNvZ25pdG9Eb21haW46IHtcbiAgICAgICAgZG9tYWluUHJlZml4OiAnbnlhc2MtYXV0aCcsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ29nbml0byBJZGVudGl0eSBQb29sXG4gICAgY29uc3QgaWRlbnRpdHlQb29sID0gbmV3IGNvZ25pdG8uQ2ZuSWRlbnRpdHlQb29sKHRoaXMsICdOeWFzY0lkZW50aXR5UG9vbCcsIHtcbiAgICAgIGlkZW50aXR5UG9vbE5hbWU6ICdueWFzY19pZGVudGl0eV9wb29sJyxcbiAgICAgIGFsbG93VW5hdXRoZW50aWNhdGVkSWRlbnRpdGllczogZmFsc2UsXG4gICAgICBjb2duaXRvSWRlbnRpdHlQcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGNsaWVudElkOiB1c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICAgIHByb3ZpZGVyTmFtZTogdXNlclBvb2wudXNlclBvb2xQcm92aWRlck5hbWUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgLy8gSUFNIHJvbGVzIGZvciBDb2duaXRvXG4gICAgY29uc3QgYXV0aGVudGljYXRlZFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgJ0NvZ25pdG9BdXRoZW50aWNhdGVkUm9sZScsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5GZWRlcmF0ZWRQcmluY2lwYWwoXG4gICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb20nLFxuICAgICAgICB7XG4gICAgICAgICAgU3RyaW5nRXF1YWxzOiB7XG4gICAgICAgICAgICAnY29nbml0by1pZGVudGl0eS5hbWF6b25hd3MuY29tOmF1ZCc6IGlkZW50aXR5UG9vbC5yZWYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAnRm9yQW55VmFsdWU6U3RyaW5nTGlrZSc6IHtcbiAgICAgICAgICAgICdjb2duaXRvLWlkZW50aXR5LmFtYXpvbmF3cy5jb206YW1yJzogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eSdcbiAgICAgICksXG4gICAgfSk7XG5cbiAgICAvLyBBdHRhY2ggcG9saWNpZXMgdG8gYXV0aGVudGljYXRlZCByb2xlXG4gICAgYXV0aGVudGljYXRlZFJvbGUuYWRkVG9Qb2xpY3kobmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgZWZmZWN0OiBpYW0uRWZmZWN0LkFMTE9XLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICAnZHluYW1vZGI6R2V0SXRlbScsXG4gICAgICAgICdkeW5hbW9kYjpQdXRJdGVtJyxcbiAgICAgICAgJ2R5bmFtb2RiOlVwZGF0ZUl0ZW0nLFxuICAgICAgICAnZHluYW1vZGI6RGVsZXRlSXRlbScsXG4gICAgICAgICdkeW5hbW9kYjpRdWVyeScsXG4gICAgICAgICdkeW5hbW9kYjpTY2FuJyxcbiAgICAgIF0sXG4gICAgICByZXNvdXJjZXM6IFsnKiddLCAvLyBXaWxsIGJlIHJlc3RyaWN0ZWQgdG8gc3BlY2lmaWMgdGFibGVcbiAgICB9KSk7XG5cbiAgICBuZXcgY29nbml0by5DZm5JZGVudGl0eVBvb2xSb2xlQXR0YWNobWVudCh0aGlzLCAnSWRlbnRpdHlQb29sUm9sZUF0dGFjaG1lbnQnLCB7XG4gICAgICBpZGVudGl0eVBvb2xJZDogaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIHJvbGVzOiB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IGF1dGhlbnRpY2F0ZWRSb2xlLnJvbGVBcm4sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gQ29nbml0byBHcm91cHNcbiAgICBjb25zdCBzdXBlckFkbWluR3JvdXAgPSBuZXcgY29nbml0by5DZm5Vc2VyUG9vbEdyb3VwKHRoaXMsICdTdXBlckFkbWluR3JvdXAnLCB7XG4gICAgICB1c2VyUG9vbElkOiB1c2VyUG9vbC51c2VyUG9vbElkLFxuICAgICAgZ3JvdXBOYW1lOiAnc3VwZXJhZG1pbicsXG4gICAgICBkZXNjcmlwdGlvbjogJ1N1cGVyIGFkbWluaXN0cmF0b3JzIHdpdGggZnVsbCBhY2Nlc3MnLFxuICAgICAgcHJlY2VkZW5jZTogMSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGFkbWluR3JvdXAgPSBuZXcgY29nbml0by5DZm5Vc2VyUG9vbEdyb3VwKHRoaXMsICdBZG1pbkdyb3VwJywge1xuICAgICAgdXNlclBvb2xJZDogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgIGdyb3VwTmFtZTogJ2FkbWluJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQWRtaW5pc3RyYXRvcnMgd2l0aCBsaW1pdGVkIGFjY2VzcycsXG4gICAgICBwcmVjZWRlbmNlOiAyLFxuICAgIH0pO1xuXG4gICAgLy8gRHluYW1vREIgVGFibGVcbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnTnlhc2NNYWluVGFibGUnLCB7XG4gICAgICB0YWJsZU5hbWU6ICdueWFzYy1tYWluLXRhYmxlJyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnUEsnLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdTSycsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIGJpbGxpbmdNb2RlOiBkeW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICBwb2ludEluVGltZVJlY292ZXJ5OiB0cnVlLFxuICAgICAgZW5jcnlwdGlvbjogZHluYW1vZGIuVGFibGVFbmNyeXB0aW9uLkFXU19NQU5BR0VELFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuUkVUQUlOLFxuICAgIH0pO1xuXG4gICAgLy8gR2xvYmFsIFNlY29uZGFyeSBJbmRleGVzXG4gICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnR1NJMScsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ0dTSTFQSycsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogJ0dTSTFTSycsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRhYmxlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ0dTSTInLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdHU0kyUEsnLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdHU0kyU0snLFxuICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB0YWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdHU0kzJyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnR1NJM1BLJyxcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiAnR1NJM1NLJyxcbiAgICAgICAgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnR1NJNCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ0dTSTRQSycsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogJ0dTSTRTSycsXG4gICAgICAgIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIFMzIEJ1Y2tldHNcbiAgICBjb25zdCBwcml2YXRlQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnTnlhc2NQcml2YXRlQnVja2V0Jywge1xuICAgICAgYnVja2V0TmFtZTogYG55YXNjLXByaXZhdGUtcHJvZHVjdHMtJHt0aGlzLmFjY291bnR9LSR7dGhpcy5yZWdpb259YCxcbiAgICAgIHZlcnNpb25lZDogdHJ1ZSxcbiAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5SRVRBSU4sXG4gICAgICBsaWZlY3ljbGVSdWxlczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdEZWxldGVJbmNvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkcycsXG4gICAgICAgICAgYWJvcnRJbmNvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkQWZ0ZXI6IGNkay5EdXJhdGlvbi5kYXlzKDEpLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHB1YmxpY0J1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ055YXNjUHVibGljQnVja2V0Jywge1xuICAgICAgYnVja2V0TmFtZTogYG55YXNjLXB1YmxpYy1hc3NldHMtJHt0aGlzLmFjY291bnR9LSR7dGhpcy5yZWdpb259YCxcbiAgICAgIHZlcnNpb25lZDogdHJ1ZSxcbiAgICAgIGVuY3J5cHRpb246IHMzLkJ1Y2tldEVuY3J5cHRpb24uUzNfTUFOQUdFRCxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5SRVRBSU4sXG4gICAgICBjb3JzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBhbGxvd2VkTWV0aG9kczogW3MzLkh0dHBNZXRob2RzLkdFVCwgczMuSHR0cE1ldGhvZHMuSEVBRF0sXG4gICAgICAgICAgYWxsb3dlZE9yaWdpbnM6IFsnKiddLFxuICAgICAgICAgIGFsbG93ZWRIZWFkZXJzOiBbJyonXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICAvLyBDbG91ZEZyb250IERpc3RyaWJ1dGlvblxuICAgIGNvbnN0IGRpc3RyaWJ1dGlvbiA9IG5ldyBjbG91ZGZyb250LkRpc3RyaWJ1dGlvbih0aGlzLCAnTnlhc2NEaXN0cmlidXRpb24nLCB7XG4gICAgICBkZWZhdWx0QmVoYXZpb3I6IHtcbiAgICAgICAgb3JpZ2luOiBuZXcgb3JpZ2lucy5TM09yaWdpbihwdWJsaWNCdWNrZXQpLFxuICAgICAgICB2aWV3ZXJQcm90b2NvbFBvbGljeTogY2xvdWRmcm9udC5WaWV3ZXJQcm90b2NvbFBvbGljeS5SRURJUkVDVF9UT19IVFRQUyxcbiAgICAgICAgY2FjaGVQb2xpY3k6IGNsb3VkZnJvbnQuQ2FjaGVQb2xpY3kuQ0FDSElOR19PUFRJTUlaRUQsXG4gICAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGRvbWFpbk5hbWVzOiBbZG9tYWluTmFtZSwgYHd3dy4ke2RvbWFpbk5hbWV9YF0sXG4gICAgICBjZXJ0aWZpY2F0ZTogY2VydGlmaWNhdGUsXG4gICAgICBwcmljZUNsYXNzOiBjbG91ZGZyb250LlByaWNlQ2xhc3MuUFJJQ0VfQ0xBU1NfMTAwLFxuICAgICAgY29tbWVudDogJ05ZQVNDIFBsYXRmb3JtIENETicsXG4gICAgfSk7XG5cbiAgICAvLyBSb3V0ZSA1MyBSZWNvcmRzXG4gICAgbmV3IHJvdXRlNTMuQVJlY29yZCh0aGlzLCAnRG9tYWluUmVjb3JkJywge1xuICAgICAgem9uZTogaG9zdGVkWm9uZSxcbiAgICAgIHJlY29yZE5hbWU6IGRvbWFpbk5hbWUsXG4gICAgICB0YXJnZXQ6IHJvdXRlNTMuUmVjb3JkVGFyZ2V0LmZyb21BbGlhcyhcbiAgICAgICAgbmV3IHJvdXRlNTN0YXJnZXRzLkNsb3VkRnJvbnRUYXJnZXQoZGlzdHJpYnV0aW9uKVxuICAgICAgKSxcbiAgICB9KTtcblxuICAgIG5ldyByb3V0ZTUzLkFSZWNvcmQodGhpcywgJ1d3d0RvbWFpblJlY29yZCcsIHtcbiAgICAgIHpvbmU6IGhvc3RlZFpvbmUsXG4gICAgICByZWNvcmROYW1lOiBgd3d3LiR7ZG9tYWluTmFtZX1gLFxuICAgICAgdGFyZ2V0OiByb3V0ZTUzLlJlY29yZFRhcmdldC5mcm9tQWxpYXMoXG4gICAgICAgIG5ldyByb3V0ZTUzdGFyZ2V0cy5DbG91ZEZyb250VGFyZ2V0KGRpc3RyaWJ1dGlvbilcbiAgICAgICksXG4gICAgfSk7XG5cbiAgICAvLyBTRVMgQ29uZmlndXJhdGlvblxuICAgIGNvbnN0IHNlc0lkZW50aXR5ID0gbmV3IHNlcy5FbWFpbElkZW50aXR5KHRoaXMsICdOeWFzY1Nlc0lkZW50aXR5Jywge1xuICAgICAgaWRlbnRpdHk6IHNlcy5JZGVudGl0eS5kb21haW4oZG9tYWluTmFtZSksXG4gICAgICBtYWlsRnJvbURvbWFpbjogYG1haWwuJHtkb21haW5OYW1lfWAsXG4gICAgfSk7XG5cbiAgICAvLyBTUVMgUXVldWVzXG4gICAgY29uc3QgZW1haWxRdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ0VtYWlsUXVldWUnLCB7XG4gICAgICBxdWV1ZU5hbWU6ICdueWFzYy1lbWFpbC1xdWV1ZScsXG4gICAgICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLm1pbnV0ZXMoNSksXG4gICAgICByZXRlbnRpb25QZXJpb2Q6IGNkay5EdXJhdGlvbi5kYXlzKDE0KSxcbiAgICAgIGRlYWRMZXR0ZXJRdWV1ZToge1xuICAgICAgICBxdWV1ZTogbmV3IHNxcy5RdWV1ZSh0aGlzLCAnRW1haWxETFEnLCB7XG4gICAgICAgICAgcXVldWVOYW1lOiAnbnlhc2MtZW1haWwtZGxxJyxcbiAgICAgICAgICByZXRlbnRpb25QZXJpb2Q6IGNkay5EdXJhdGlvbi5kYXlzKDE0KSxcbiAgICAgICAgfSksXG4gICAgICAgIG1heFJlY2VpdmVDb3VudDogMyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBzZWFyY2hJbmRleFF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnU2VhcmNoSW5kZXhRdWV1ZScsIHtcbiAgICAgIHF1ZXVlTmFtZTogJ255YXNjLXNlYXJjaC1pbmRleC1xdWV1ZScsXG4gICAgICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLm1pbnV0ZXMoMiksXG4gICAgICByZXRlbnRpb25QZXJpb2Q6IGNkay5EdXJhdGlvbi5kYXlzKDcpLFxuICAgIH0pO1xuXG4gICAgLy8gRXZlbnRCcmlkZ2UgUnVsZXNcbiAgICBjb25zdCBkYWlseVNpdGVtYXBSdWxlID0gbmV3IGV2ZW50cy5SdWxlKHRoaXMsICdEYWlseVNpdGVtYXBSdWxlJywge1xuICAgICAgc2NoZWR1bGU6IGV2ZW50cy5TY2hlZHVsZS5jcm9uKHtcbiAgICAgICAgbWludXRlOiAnMCcsXG4gICAgICAgIGhvdXI6ICcyJyxcbiAgICAgICAgZGF5OiAnKicsXG4gICAgICAgIG1vbnRoOiAnKicsXG4gICAgICAgIHllYXI6ICcqJyxcbiAgICAgIH0pLFxuICAgICAgZGVzY3JpcHRpb246ICdHZW5lcmF0ZSBzaXRlbWFwIGRhaWx5IGF0IDIgQU0nLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWJhbmRvbmVkQ2FydFJ1bGUgPSBuZXcgZXZlbnRzLlJ1bGUodGhpcywgJ0FiYW5kb25lZENhcnRSdWxlJywge1xuICAgICAgc2NoZWR1bGU6IGV2ZW50cy5TY2hlZHVsZS5jcm9uKHtcbiAgICAgICAgbWludXRlOiAnMCcsXG4gICAgICAgIGhvdXI6ICcqLzYnLFxuICAgICAgICBkYXk6ICcqJyxcbiAgICAgICAgbW9udGg6ICcqJyxcbiAgICAgICAgeWVhcjogJyonLFxuICAgICAgfSksXG4gICAgICBkZXNjcmlwdGlvbjogJ0NoZWNrIGZvciBhYmFuZG9uZWQgY2FydHMgZXZlcnkgNiBob3VycycsXG4gICAgfSk7XG5cbiAgICAvLyBWUEMgZm9yIE1laWxpc2VhcmNoXG4gICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgJ055YXNjVnBjJywge1xuICAgICAgbWF4QXpzOiAyLFxuICAgICAgbmF0R2F0ZXdheXM6IDEsXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBjaWRyTWFzazogMjQsXG4gICAgICAgICAgbmFtZTogJ1B1YmxpYycsXG4gICAgICAgICAgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFVCTElDLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY2lkck1hc2s6IDI0LFxuICAgICAgICAgIG5hbWU6ICdQcml2YXRlJyxcbiAgICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QUklWQVRFX1dJVEhfRUdSRVNTLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIC8vIFNlY3VyaXR5IEdyb3VwIGZvciBNZWlsaXNlYXJjaFxuICAgIGNvbnN0IG1laWxpU2VjdXJpdHlHcm91cCA9IG5ldyBlYzIuU2VjdXJpdHlHcm91cCh0aGlzLCAnTWVpbGlTZWN1cml0eUdyb3VwJywge1xuICAgICAgdnBjLFxuICAgICAgZGVzY3JpcHRpb246ICdTZWN1cml0eSBncm91cCBmb3IgTWVpbGlzZWFyY2ggaW5zdGFuY2UnLFxuICAgICAgYWxsb3dBbGxPdXRib3VuZDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIG1laWxpU2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShcbiAgICAgIGVjMi5QZWVyLmFueUlwdjQoKSxcbiAgICAgIGVjMi5Qb3J0LnRjcCg3NzAwKSxcbiAgICAgICdBbGxvdyBNZWlsaXNlYXJjaCBIVFRQIGFjY2VzcydcbiAgICApO1xuXG4gICAgLy8gTWVpbGlzZWFyY2ggRUMyIEluc3RhbmNlXG4gICAgY29uc3QgbWVpbGlJbnN0YW5jZSA9IG5ldyBlYzIuSW5zdGFuY2UodGhpcywgJ01laWxpc2VhcmNoSW5zdGFuY2UnLCB7XG4gICAgICB2cGMsXG4gICAgICBpbnN0YW5jZVR5cGU6IGVjMi5JbnN0YW5jZVR5cGUub2YoZWMyLkluc3RhbmNlQ2xhc3MuVDMsIGVjMi5JbnN0YW5jZVNpemUuU01BTEwpLFxuICAgICAgbWFjaGluZUltYWdlOiBlYzIuTWFjaGluZUltYWdlLmxhdGVzdEFtYXpvbkxpbnV4MigpLFxuICAgICAgc2VjdXJpdHlHcm91cDogbWVpbGlTZWN1cml0eUdyb3VwLFxuICAgICAgdnBjU3VibmV0czoge1xuICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QUklWQVRFX1dJVEhfRUdSRVNTLFxuICAgICAgfSxcbiAgICAgIHVzZXJEYXRhOiBlYzIuVXNlckRhdGEuZm9yTGludXgoKSxcbiAgICAgIHJvbGU6IG5ldyBpYW0uUm9sZSh0aGlzLCAnTWVpbGlJbnN0YW5jZVJvbGUnLCB7XG4gICAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdlYzIuYW1hem9uYXdzLmNvbScpLFxuICAgICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUnKSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgLy8gT3V0cHV0c1xuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdVc2VyUG9vbElkJywge1xuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NvZ25pdG8gVXNlciBQb29sIElEJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY1VzZXJQb29sSWQnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sQ2xpZW50SWQnLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ29nbml0byBVc2VyIFBvb2wgQ2xpZW50IElEJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY1VzZXJQb29sQ2xpZW50SWQnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1VzZXJQb29sRG9tYWluJywge1xuICAgICAgdmFsdWU6IHVzZXJQb29sRG9tYWluLmRvbWFpbk5hbWUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NvZ25pdG8gVXNlciBQb29sIERvbWFpbicsXG4gICAgICBleHBvcnROYW1lOiAnTnlhc2NVc2VyUG9vbERvbWFpbicsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnSWRlbnRpdHlQb29sSWQnLCB7XG4gICAgICB2YWx1ZTogaWRlbnRpdHlQb29sLnJlZixcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ29nbml0byBJZGVudGl0eSBQb29sIElEJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY0lkZW50aXR5UG9vbElkJyxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdEeW5hbW9UYWJsZU5hbWUnLCB7XG4gICAgICB2YWx1ZTogdGFibGUudGFibGVOYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdEeW5hbW9EQiBUYWJsZSBOYW1lJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY0R5bmFtb1RhYmxlTmFtZScsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnUHJpdmF0ZUJ1Y2tldE5hbWUnLCB7XG4gICAgICB2YWx1ZTogcHJpdmF0ZUJ1Y2tldC5idWNrZXROYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdTMyBQcml2YXRlIEJ1Y2tldCBOYW1lJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY1ByaXZhdGVCdWNrZXROYW1lJyxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdQdWJsaWNCdWNrZXROYW1lJywge1xuICAgICAgdmFsdWU6IHB1YmxpY0J1Y2tldC5idWNrZXROYW1lLFxuICAgICAgZGVzY3JpcHRpb246ICdTMyBQdWJsaWMgQnVja2V0IE5hbWUnLFxuICAgICAgZXhwb3J0TmFtZTogJ055YXNjUHVibGljQnVja2V0TmFtZScsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnQ2xvdWRGcm9udERpc3RyaWJ1dGlvbklkJywge1xuICAgICAgdmFsdWU6IGRpc3RyaWJ1dGlvbi5kaXN0cmlidXRpb25JZCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2xvdWRGcm9udCBEaXN0cmlidXRpb24gSUQnLFxuICAgICAgZXhwb3J0TmFtZTogJ055YXNjQ2xvdWRGcm9udERpc3RyaWJ1dGlvbklkJyxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdDbG91ZEZyb250RG9tYWluTmFtZScsIHtcbiAgICAgIHZhbHVlOiBkaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uRG9tYWluTmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2xvdWRGcm9udCBEaXN0cmlidXRpb24gRG9tYWluIE5hbWUnLFxuICAgICAgZXhwb3J0TmFtZTogJ055YXNjQ2xvdWRGcm9udERvbWFpbk5hbWUnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1Nlc1NlbmRlckVtYWlsJywge1xuICAgICAgdmFsdWU6IGBoaUAke2RvbWFpbk5hbWV9YCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnU0VTIFNlbmRlciBFbWFpbCcsXG4gICAgICBleHBvcnROYW1lOiAnTnlhc2NTZXNTZW5kZXJFbWFpbCcsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnRW1haWxRdWV1ZVVybCcsIHtcbiAgICAgIHZhbHVlOiBlbWFpbFF1ZXVlLnF1ZXVlVXJsLFxuICAgICAgZGVzY3JpcHRpb246ICdTUVMgRW1haWwgUXVldWUgVVJMJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY0VtYWlsUXVldWVVcmwnLFxuICAgIH0pO1xuXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ01laWxpSW5zdGFuY2VJZCcsIHtcbiAgICAgIHZhbHVlOiBtZWlsaUluc3RhbmNlLmluc3RhbmNlSWQsXG4gICAgICBkZXNjcmlwdGlvbjogJ01laWxpc2VhcmNoIEluc3RhbmNlIElEJyxcbiAgICAgIGV4cG9ydE5hbWU6ICdOeWFzY01laWxpSW5zdGFuY2VJZCcsXG4gICAgfSk7XG5cbiAgICBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCAnU2VjcmV0c0FybicsIHtcbiAgICAgIHZhbHVlOiBzZWNyZXRzLnNlY3JldEFybixcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2VjcmV0cyBNYW5hZ2VyIEFSTicsXG4gICAgICBleHBvcnROYW1lOiAnTnlhc2NTZWNyZXRzQXJuJyxcbiAgICB9KTtcbiAgfVxufVxuIl19