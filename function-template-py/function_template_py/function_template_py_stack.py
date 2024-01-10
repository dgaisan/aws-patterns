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

        # Producer Lambda
        producer_function = function.Function(
            self, "producer-lambda",
            function_name="producer-lambda",
            code=function.Code.from_asset("lambdas"),
            handler="producer_template.handler",
            runtime=function.Runtime.PYTHON_3_8,
            timeout=Duration.minutes(3),
            role=lambda_role,
            environment={
                "SNS_TOPIC_ARN": topic.topic_arn,
                "SQS_URL": queue.queue_url,
                "LOCALSTACK_ENDPOINT": ""
            }
        )

        queue.grant_send_messages(producer_function)
        topic.grant_publish(producer_function)

        # SNS subscriber lambda
        subscriber_function = function.Function(
            self, "subscriber_lambda",
            function_name="subscriber_lambda",
            code=function.Code.from_asset("lambdas"),
            handler="subscriber_template.handler",
            runtime=function.Runtime.PYTHON_3_8,
            timeout=Duration.minutes(3),
            role=lambda_role,
            environment={
                "SNS_TOPIC_ARN": topic.topic_arn
            }
        )

        topic.add_subscription(subs.LambdaSubscription(subscriber_function))



        