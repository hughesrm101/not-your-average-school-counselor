#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NyascInfrastructureStack } from '../lib/infra-stack';

const app = new cdk.App();

// Environment configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

// Main infrastructure stack
new NyascInfrastructureStack(app, 'NyascInfrastructureStack', {
  env,
  description: 'NYASC Platform Infrastructure - Cognito, DynamoDB, S3, SES, CloudFront, and supporting services',
  tags: {
    Project: 'NYASC',
    Environment: 'Production',
    Owner: 'NYASC Team',
  },
});

app.synth();
