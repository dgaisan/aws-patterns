import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';


export class PixelTrackingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pixelTrackingBucket = new s3.Bucket(this, 'PixelTrackingBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY // change to something else in prod
    });

    
  }
}
