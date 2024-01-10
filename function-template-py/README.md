This is template python project using AWS CDK to define infrastructure and AWS SAM for testing functions. 


# AWS CDK

The `cdk.json` file tells the CDK Toolkit how to execute your app.

This project is set up like a standard Python project.  The initialization process also creates
a virtualenv within this project, stored under the .venv directory.  To create the virtualenv
it assumes that there is a `python3` executable in your path with access to the `venv` package.
If for any reason the automatic creation of the virtualenv fails, you can create the virtualenv
manually once the init process completes.

To manually create a virtualenv on MacOS and Linux:

```
$ python3 -m venv .venv
```

After the init process completes and the virtualenv is created, you can use the following
step to activate your virtualenv.

```
$ source .venv/bin/activate
```

If you are a Windows platform, you would activate the virtualenv like this:

```
% .venv\Scripts\activate.bat
```

Once the virtualenv is activated, you can install the required dependencies.

```
$ pip install -r requirements.txt
$ pip install -r requirements-dev.txt (for testing purposes)
```

At this point you can now synthesize the CloudFormation template for this code.

```
$ cdk synth
```

You can now begin exploring the source code, contained in the hello directory.
There is also a very trivial test included that can be run like this:

```
$ pytest
```

To add additional dependencies, for example other CDK libraries, just add to
your requirements.txt file and rerun the `pip install -r requirements.txt`
command.

## Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

When initializing environment for the first time run `cdk bootstrap`.
Run `cdk synth` each time a new construct is introduced
Run `cdk deploy` to deploy stack into AWS

# AWS SAM
- Before running any of testing commands make sure to start up Docker service/daemon
- Install AWS SAM CLI

### Subscriber Lambda

```
sam local invoke subscriber_lambda --event tests/sns_event.json -t cdk.out/FunctionTemplatePyStack.template.json
```

### Consumer Lambda

```
sam local invoke consumer_lambda --event tests/sqs_event.json -t cdk.out/FunctionTemplatePyStack.template.json
```

### Producer Lambda
Producer Lambda has SNS and SQS dependencies therefore there's an additional setup to test it out
One option is to use localstack
1. Start up localstack `localstack start`
2. create a topic in localstack SNS

```
sam local invoke producer-lambda --no-event -t cdk.out/FunctionTemplatePyStack.template.json
```

Test producer-lambda passing inline event:

```
echo '{"payload": "some message" }' | sam local invoke producer-lambda --event - -t cdk.out/FunctionTemplatePyStack.template.json
```