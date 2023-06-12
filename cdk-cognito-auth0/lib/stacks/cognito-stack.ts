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
  public readonly authenticatedUserGroupRole: iam.Role;
  public readonly unauthenticatedUserGroupRole: iam.Role;

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

    this.unauthenticatedUserGroupRole = new iam.Role(
      this,
      "auth0-unauth-group-role",
      {
        description: "role for unauthenticated users",
        assumedBy: new iam.FederatedPrincipal(
          "cognito-identity.amazonaws.com",
          {
            StringEquals: {
              "cognito-identity.amazonaws.com:aud": this.identityPool.ref,
            },
            "ForAnyValue:StringLike": {
              "cognito-identity.amazonaws.com:amr": "unauthenticated",
            },
          },
          "sts:AssumeRoleWithWebIdentity"
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName(
            "service-role/AWSLambdaBasicExecutionRole"
          ),
        ],
      }
    );

    this.authenticatedUserGroupRole = new iam.Role(this, "auth0-auth-group-role", {
      description: "role for authenticated users",
      assumedBy: new iam.FederatedPrincipal(
        "cognito-identity.amazonaws.com",
        {
          StringEquals: {
            "cognito-identity.amazonaws.com:aud": this.identityPool.ref,
          },
          "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "authenticated",
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    new cognito.CfnIdentityPoolRoleAttachment(
      this,
      "auth0-identitypool-role-attachment",
      {
        identityPoolId: this.identityPool.ref,
        roles: {
          authentiawscated: this.authenticatedUserGroupRole.roleArn,
          unauthenticated: this.unauthenticatedUserGroupRole.roleArn,
        },
      }
    );

    new CfnOutput(this, "identityPoolId", {
      value: this.identityPool.ref,
    });
  }
}
