import { Handler } from "aws-cdk-lib/aws-lambda";
import { S3Event, Context } from "aws-lambda";


export const handler: Handler = async (event: S3Event, context: Context) => {    

  try {
    const bucketName = process.env.BUCKET_NAME;
    const trackingId = context.awsRequestId;

    console.log("++++++++++++ Pixel Track handler");
    
  } catch (err) {
    console.log("ERROR", err);
  }
};
