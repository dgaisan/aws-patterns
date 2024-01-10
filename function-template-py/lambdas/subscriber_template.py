import boto3
import json
import os

def handler(event, context):
    print("-->> subscriber_template handler: {}".format(json.dumps(event)))

    topic_arn = os.environ["SNS_TOPIC_ARN"]
    total_messages = 0

    for record in event["Records"]:
        message = record["Sns"]["Message"]
        print(f"message from SNS Topic: {message}")
        total_messages += 1

    return {
        "statusCode": 200,
        "body": f"SNS messages processed {total_messages}"
    }
