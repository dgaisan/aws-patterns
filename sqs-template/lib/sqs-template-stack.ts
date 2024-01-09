import { Stack, StackProps, Duration, Construct } from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";

export class SqsTemplateStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "SqsTemplateQueue", {
      visibilityTimeout: Duration.seconds(300),
    });

    
  }
}
