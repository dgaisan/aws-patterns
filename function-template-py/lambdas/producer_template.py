import boto3
import json
import random
import os

def get_sns_client():
    if os.environ.get("LOCALSTACK_ENDPOINT"):
        return boto3.client("sns", endpoint_url="http://localhost:4566")
    else:
        return boto3.client("sns")

def get_sqs_client():
    if os.environ.get("LOCALSTACK_ENDPOINT"):
        return boto3.client("sqs", endpoint_url="http://localhost:4566")
    else:
        return boto3.client("sqs")

def handler(event, context):
    print("-->> producer_template handler: {}".format(json.dumps(event)))

    sns_arn = os.environ["SNS_TOPIC_ARN"]
    sqs_url = os.environ["SQS_URL"]

    sns_client = get_sns_client()
    sns_client.publish(
        TopicArn=sns_arn, Message="Random Message for SNS Topic {}".format(random.random()))

    sqs_client = get_sqs_client()
    sqs_client.send_message(
        QueueUrl=sqs_url, MessageBody="Random Message for SQS")


    return {
        "statusCode": 200,
        "body": "All messages have been sent"
    }
