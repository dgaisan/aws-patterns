import {
  aws_iam as iam,
  aws_cognito as cognito,
  Stack,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import config from "./../config";

export class CongnitoStack extends Stack {
  public readonly identityPool: cognito.CfnIdentityPool;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const provider = new iam.OpenIdConnectProvider(this, "Auth0Provider", {
      url: config.auth0Domain,
      clientIds: [config.auth0ClientId],
    });

    this.identityPool = new cognito.CfnIdentityPool(
      this,
      "auth0-identity-pool",
      {
        identityPoolName: "auth0-identity-pool",
        allowUnauthenticatedIdentities: true,
        openIdConnectProviderArns: [provider.openIdConnectProviderArn],
      }
    );

    new CfnOutput(this, "identityPoolId", {
      value: this.identityPool.ref,
    });
  }
}
