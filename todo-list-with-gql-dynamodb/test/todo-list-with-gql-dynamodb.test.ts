import * as cdk from "aws-cdk-lib";
import { Capture, Match, Template } from "aws-cdk-lib/assertions";
import * as TodoListWithGqlDynamodb from "../lib/todo-list-with-gql-dynamodb-stack";

test("GraphQL Api created", () => {
  const app = new cdk.App();
  const stack = new TodoListWithGqlDynamodb.TodoListWithGqlDynamodbStack(
    app,
    "MyGraphQL-With-DynamoDB-Stack"
  );
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::Role", {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: "sts:AssumeRole",
          Effect: "Allow",
          Principal: {
            Service: "dynamodb.amazonaws.com",
          },
        },
      ],
    },
  });
});
