import {Handler} from "aws-cdk-lib/aws-lambda";

export const handler: Handler = (event = {}) => {
    console.log("->>>>>LogEvent handler");
    console.log(JSON.stringify(event));

    return {
        status: "OK",
        body: "Event has been logged"
    };
} 