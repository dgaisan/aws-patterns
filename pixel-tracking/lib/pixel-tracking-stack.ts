import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class PixelTrackingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pixelTrackingBucket = new cdk.aws_s3.Bucket(
      this,
      "PixelTrackingBucket",
      {
        removalPolicy: cdk.RemovalPolicy.DESTROY, // change to something else in prod
      }
    );

    // Init lambda
    const trackingFunction = new lambda.Function(this, "TrackingFunction", {
      code: lambda.AssetCode.fromAsset("functions"),
      handler: "track.handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(5),
      memorySize: 512,
      environment: {
        PIXEL_BUCKET: pixelTrackingBucket.bucketName
      }
    });

    // init Apigw and wrire to the lambda

    // create dynamo table
  }
}
