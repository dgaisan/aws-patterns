"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListWithGqlDynamodbStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
class TodoListWithGqlDynamodbStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const loggingRole = new aws_iam_1.Role(this, "ToDoLoggingRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("dynamodb.amazonaws.com"),
            managedPolicies: [
                cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppSyncPushToCloudWatchLogs"),
            ],
        });
        const dataAccessRole = new aws_iam_1.Role(this, "ToDoDataAcessRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("dynamodb.amazonaws.com"),
        });
        dataAccessRole.attachInlinePolicy(new aws_iam_1.Policy(this, "dynamodb-read-write", {
            statements: [
                new aws_iam_1.PolicyStatement({
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
        }));
    }
}
exports.TodoListWithGqlDynamodbStack = TodoListWithGqlDynamodbStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kby1saXN0LXdpdGgtZ3FsLWR5bmFtb2RiLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9kby1saXN0LXdpdGgtZ3FsLWR5bmFtb2RiLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyxpREFPNkI7QUFHN0IsTUFBYSw0QkFBNkIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUN6RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzlELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sV0FBVyxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUNwRCxTQUFTLEVBQUUsSUFBSSwwQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQztZQUN6RCxlQUFlLEVBQUU7Z0JBQ2YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQ2hELDZDQUE2QyxDQUM5QzthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3pELFNBQVMsRUFBRSxJQUFJLDBCQUFnQixDQUFDLHdCQUF3QixDQUFDO1NBQzFELENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxrQkFBa0IsQ0FDL0IsSUFBSSxnQkFBTSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUN0QyxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSx5QkFBZSxDQUFDO29CQUNsQixPQUFPLEVBQUU7d0JBQ1AsdUJBQXVCO3dCQUN2Qix5QkFBeUI7d0JBQ3pCLGtCQUFrQjt3QkFDbEIscUJBQXFCO3dCQUNyQixrQkFBa0I7d0JBQ2xCLGVBQWU7d0JBQ2YsZ0JBQWdCO3dCQUNoQixxQkFBcUI7cUJBQ3RCO29CQUNBLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDbEIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFwQ0Qsb0VBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtcbiAgTWFuYWdlZFBvbGljeSxcbiAgUG9saWN5LFxuICBQb2xpY3lEb2N1bWVudCxcbiAgUG9saWN5U3RhdGVtZW50LFxuICBSb2xlLFxuICBTZXJ2aWNlUHJpbmNpcGFsLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIFRvZG9MaXN0V2l0aEdxbER5bmFtb2RiU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBsb2dnaW5nUm9sZSA9IG5ldyBSb2xlKHRoaXMsIFwiVG9Eb0xvZ2dpbmdSb2xlXCIsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoXCJkeW5hbW9kYi5hbWF6b25hd3MuY29tXCIpLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgIGNkay5hd3NfaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuICAgICAgICAgIFwic2VydmljZS1yb2xlL0FXU0FwcFN5bmNQdXNoVG9DbG91ZFdhdGNoTG9nc1wiXG4gICAgICAgICksXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0YUFjY2Vzc1JvbGUgPSBuZXcgUm9sZSh0aGlzLCBcIlRvRG9EYXRhQWNlc3NSb2xlXCIsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoXCJkeW5hbW9kYi5hbWF6b25hd3MuY29tXCIpLFxuICAgIH0pO1xuICAgIGRhdGFBY2Nlc3NSb2xlLmF0dGFjaElubGluZVBvbGljeShcbiAgICAgIG5ldyBQb2xpY3kodGhpcywgXCJkeW5hbW9kYi1yZWFkLXdyaXRlXCIsIHtcbiAgICAgICAgc3RhdGVtZW50czogW1xuICAgICAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgYWN0aW9uczogW1xuICAgICAgICAgICAgICBcImR5bmFtb2RiOkJhdGNoR2V0SXRlbVwiLFxuICAgICAgICAgICAgICBcImR5bmFtb2RiOkJhdGNoV3JpdGVJdGVtXCIsXG4gICAgICAgICAgICAgIFwiZHluYW1vZGI6UHV0SXRlbVwiLFxuICAgICAgICAgICAgICBcImR5bmFtb2RiOkRlbGV0ZUl0ZW1cIixcbiAgICAgICAgICAgICAgXCJkeW5hbW9kYjpHZXRJdGVtXCIsXG4gICAgICAgICAgICAgIFwiZHluYW1vZGI6U2NhblwiLFxuICAgICAgICAgICAgICBcImR5bmFtb2RiOlF1ZXJ5XCIsXG4gICAgICAgICAgICAgIFwiZHluYW1vZGI6VXBkYXRlSXRlbVwiLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIMKgcmVzb3VyY2VzOiBbXCIqXCJdXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==