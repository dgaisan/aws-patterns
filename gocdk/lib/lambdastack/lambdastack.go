package lambdastack

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type LambdaStackProps struct {
	awscdk.StackProps
}

func LambdaStack(scope constructs.Construct, id string, props *LambdaStackProps) awscdk.Stack {
	stack := awscdk.NewStack(scope, &id, &props.StackProps)

	lambda := awslambda.NewFunction(stack, jsii.String("lambda-function"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_PROVIDED_AL2023(),
		Code:    awslambda.Code_FromAsset(jsii.String("lambda/function.zip"), nil),
		Handler: jsii.String("main"),
	})

	api := awsapigateway.NewRestApi(stack, jsii.String("RestApiIntegration"), &awsapigateway.RestApiProps{
		RestApiName: jsii.String("RestApiIntegration"),
	})

	lambdaIntegration := awsapigateway.NewLambdaIntegration(lambda, nil)
	api.Root().AddMethod(jsii.String("GET"), lambdaIntegration, nil)

	return stack
}
