import { CfnOutput, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class RefreshTokenStack extends Stack {
  devStage: apigateway.Stage;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const handler = new lambda.Function(this, "RefreshTokenHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("functions"),
      handler: "refresh-token-service.handler",
    });

    const api = new apigateway.RestApi(this, "refresh-token-api", {
      restApiName: "Refresh Token Service",
      description: "This service refreshes Auth0 Tokens.",
      deploy: false,
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(handler, {});
    api.root.addResource("token").addMethod("GET", lambdaIntegration);

    const devDeploy = new apigateway.Deployment(this, "dev-deployment", {
      api,
    });
    this.devStage = new apigateway.Stage(this, "devStage", {
      deployment: devDeploy,
      stageName: "dev", // If not passed, by default it will be 'prod'
    });

    new CfnOutput(this, "BotURL", {
      value: `https://${api.restApiId}.execute-api.${this.region}.amazonaws.com/dev/bot`,
    });
  }
}
