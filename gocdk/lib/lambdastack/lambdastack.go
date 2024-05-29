package lambdastack

import (
	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsapigateway"
	"github.com/aws/aws-cdk-go/awscdk/v2/awsdynamodb"
	"github.com/aws/aws-cdk-go/awscdk/v2/awslambda"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type LambdaStackProps struct {
	awscdk.StackProps
}

func LambdaStack(scope constructs.Construct, id string, props *LambdaStackProps) awscdk.Stack {
	stack := awscdk.NewStack(scope, &id, &props.StackProps)

	table := awsdynamodb.NewTable(stack, jsii.String("dynamo-table"), &awsdynamodb.TableProps{
		PartitionKey: &awsdynamodb.Attribute{
			Name: jsii.String("id"),
			Type: awsdynamodb.AttributeType_STRING,
		},
	})

	lambda := awslambda.NewFunction(stack, jsii.String("lambda-function"), &awslambda.FunctionProps{
		Runtime: awslambda.Runtime_PROVIDED_AL2023(),
		Code:    awslambda.Code_FromAsset(jsii.String("lambda/function.zip"), nil),
		Handler: jsii.String("main"),
	})

	table.GrantReadWriteData(lambda)

	api := awsapigateway.NewRestApi(stack, jsii.String("rest-api-integration"), &awsapigateway.RestApiProps{
		RestApiName: jsii.String("RestApiIntegration"),
	})

	lambdaIntegration := awsapigateway.NewLambdaIntegration(lambda, nil)
	api.Root().AddMethod(jsii.String("GET"), lambdaIntegration, nil)

	return stack
}
