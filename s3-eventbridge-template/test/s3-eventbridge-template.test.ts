import { RemovalPolicy, App, Duration } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as S3EventbridgeTemplate from '../lib/s3-eventbridge-template-stack';

test('S3 Bucket, Lambda Function, and Event Rule are created', () => {
  const app = new App();
  // WHEN
  const stack = new S3EventbridgeTemplate.S3EventbridgeTemplateStack(app, 'MyTestStack');
  // THEN

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {});
  template.hasResourceProperties('AWS::Lambda::Function', {});
  template.hasResourceProperties('AWS::Events::Rule', {});
});
