import { aws_cognito as cognito, CfnResource, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
require('dotenv').config();


const AUTH0_CLIENT_ID: string = process.env.AUTH0_CLIENT_ID || "";
const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN || "";

export class CongnitoStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const userPool = new cognito.UserPool(this, 'UserPool', {
      userPoolName: 'MyUserPool',
      selfSignUpEnabled: true,
    });

    const identityPool = new cognito.CfnIdentityPool(this, 'auth0-identity-pool', {
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: AUTH0_CLIENT_ID,
          providerName: AUTH0_DOMAIN,
          serverSideTokenCheck: false,
        },
      ],
      identityPoolName: "auth0-identity-pool",
    });

    identityPool.addDependency(userPool.node.defaultChild as CfnResource);
  }
}
