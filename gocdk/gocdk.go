package main

import (
	"gocdk/lib/lambdastack"

	"github.com/aws/aws-cdk-go/awscdk/v2"
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
)

type GocdkStackProps struct {
	awscdk.StackProps
}

func NewGocdkStack(scope constructs.Construct, id string, props *GocdkStackProps) awscdk.Stack {
	var sprops awscdk.StackProps
	if props != nil {
		sprops = props.StackProps
	}
	stack := awscdk.NewStack(scope, &id, &sprops)

	lambdastack.LambdaStack(stack, *jsii.String("LambdaStack"), &lambdastack.LambdaStackProps{})

	return stack
}

func main() {
	defer jsii.Close()

	app := awscdk.NewApp(nil)

	NewGocdkStack(app, "GocdkStack", &GocdkStackProps{
		awscdk.StackProps{
			Env: env(),
		},
	})

	app.Synth(nil)
}

func env() *awscdk.Environment {
	return nil
}
