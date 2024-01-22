import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import { Construct } from "constructs";

export class S3EventbridgeTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, "S3EventbridgeTemplateStack-bucket-01", {
      eventBridgeEnabled: true,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    const deadLetterQueue = new sqs.Queue(this, 'Queue');

    const fn = new lambda.Function(this, "S3EventbridgeTemplate-function", {
      functionName: "LogEvent-Function",
      code: lambda.AssetCode.fromAsset("lambdas"),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "LogEvent.handler",
      memorySize: 512,
      timeout: Duration.seconds(20)
    });

    const eventRule = new events.Rule(this, 'Event Rule', {

      eventPattern: {
        source: ["aws.s3"],
        detailType: ["New Object"],
        detail: {
          bucket: {
            name: [s3Bucket.bucketName]
          }
        }
      }
    });
    eventRule.addTarget(new targets.LambdaFunction(fn, {
      retryAttempts: 2,
      maxEventAge: Duration.hours(1),
      deadLetterQueue
    }))

    targets.addLambdaPermission(eventRule, fn);

    new CfnOutput(this, "S3 Bucket", {value: s3Bucket.bucketName});
    new CfnOutput(this, "Event ARN", {value: eventRule.ruleArn});
    new CfnOutput(this, "Lambda Function", {value: fn.functionName});

  }
}
