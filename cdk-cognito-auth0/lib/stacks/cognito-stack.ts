import {
  aws_iam as iam,
  aws_cognito as cognito,
  CfnResource,
  Stack,
  CfnOutput,
} from "aws-cdk-lib";
import { Construct } from "constructs";
require("dotenv").config();

const AUTH0_CLIENT_ID: string = process.env.AUTH0_CLIENT_ID || "";
const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN || "";

export class CongnitoStack extends Stack {
  public readonly identityPool: cognito.CfnIdentityPool;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const provider = new iam.OpenIdConnectProvider(this, "Auth0Provider", {
      url: AUTH0_DOMAIN,
      clientIds: [AUTH0_CLIENT_ID]
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
