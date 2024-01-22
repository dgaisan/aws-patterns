#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { S3EventbridgeTemplateStack } from '../lib/s3-eventbridge-template-stack';

const app = new cdk.App();
new S3EventbridgeTemplateStack(app, 'S3EventbridgeTemplateStack');
