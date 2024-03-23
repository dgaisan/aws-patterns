import {Handler} from "aws-cdk-lib/aws-lambda";
import { APIGatewayProxyEvent, APIGatewayProxyResult, EventBridgeEvent } from 'aws-lambda';

export const handler: Handler = async (event: EventBridgeEvent<any, any>): Promise<any> => {
    console.log("->>>>>LogEvent handler");
    
    try {
        const {} = event
        console.log();
    } catch (err) {
        console.log("-<<<<<<<< Unable to process event details");
        return {
            statusCode: 400,
            body: "Unable to process event"
        }
    }
    

    

    return {
        statusCode: 200,
        body: "Event has been logged"
    };
} 