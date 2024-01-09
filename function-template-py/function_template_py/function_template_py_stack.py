from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,
    aws_iam as iam,
    aws_sqs as sqs,
    aws_sns as sns,
    aws_sns_subscriptions as subs,
    aws_lambda as function
)


class FunctionTemplatePyStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Creating SQS queue
        queue = sqs.Queue(
            self, "FunctionTemplatePyQueue",
            visibility_timeout=Duration.seconds(300),
        )

        # Creating SNS topic 
        topic = sns.Topic(
            self, "FunctionTemplatePyTopic"
        )

        lambda_role = iam.Role(self, "LambdaRole", assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"))
        # lambda_role.add_managed_policy(iam.ManagedPolicy.from_aws_managed_policy_name("ReadOnly"))
        producer_function = function.Function(
            self, "function-template-py",
            function_name="producer-lambda",
            code=function.Code.from_asset("lambda_code"),
            handler="producer_template.handler",
            runtime=function.Runtime.PYTHON_3_8,
            timeout=Duration.minutes(3),
            role=lambda_role
        )

        queue.grant_send_messages(producer_function)
        topic.grant_publish(producer_function)