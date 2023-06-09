import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CongnitoStack } from "./stacks/cognito-stack";

export class CdkCognitoAuth0Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CongnitoStack(scope, 'CognitoStack');
  }
}
