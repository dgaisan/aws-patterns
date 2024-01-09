import json

def handler(event, context):
    print("-------- producer_template handler --------")
    print("request {}".format(json.dumps(event)))

    return {
        "statusCode": 200,
        "body": "Template Producer Function"
    }