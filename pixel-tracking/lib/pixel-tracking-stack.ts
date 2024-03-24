import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";


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

    const api = new apigateway.RestApi(this, 'PixelTrackingApi', {
      restApiName: 'Pixel Tracking API',
      description: 'API for tracking pixel hits',
    });

    const resource = api.root.addResource('trackpixel');
    const lambdaIntegration = new apigateway.LambdaIntegration(trackingFunction);
    resource.addMethod('GET', lambdaIntegration);

    const trackingTable = new dynamodb.Table(this, 'TrackingTable', {
      partitionKey: { name: 'trackingId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY, // change to something else in prod
    });
    trackingTable.grantReadWriteData(trackingFunction);
  }
}
