import boto3
import json
import os

def handler(event, context):
    print("-->> consumer_template handler: {}".format(json.dumps(event)))

    sqs_url = os.environ["SQS_URL"]
    sqs_client = boto3.client("sqs")
    payload = sqs_client.receive_message(QueueUrl=sqs_url, MaxNumberOfMessages=1)
    message = payload.get("Messages", [])

    if message:
        print(f"message received {message}")
    else:
        print("No messages found in payload.")

    return {
        "statusCode": 200,
        "body": f"Messages from SQS has been processed."
    }