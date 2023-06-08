import * as cdk from "aws-cdk-lib";
import {
  ManagedPolicy,
  Policy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class TodoListWithGqlDynamodbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const loggingRole = new Role(this, "ToDoLoggingRole", {
      assumedBy: new ServicePrincipal("dynamodb.amazonaws.com"),
      managedPolicies: [
        cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSAppSyncPushToCloudWatchLogs"
        ),
      ],
    });

    const dataAccessRole = new Role(this, "ToDoDataAcessRole", {
      assumedBy: new ServicePrincipal("dynamodb.amazonaws.com"),
    });
    dataAccessRole.attachInlinePolicy(
      new Policy(this, "dynamodb-read-write", {
        statements: [
          new PolicyStatement({
            actions: [
              "dynamodb:BatchGetItem",
              "dynamodb:BatchWriteItem",
              "dynamodb:PutItem",
              "dynamodb:DeleteItem",
              "dynamodb:GetItem",
              "dynamodb:Scan",
              "dynamodb:Query",
              "dynamodb:UpdateItem",
            ],
             resources: ["*"]
          }),
        ],
      })
    );
  }
}
