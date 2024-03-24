import { Handler } from "aws-cdk-lib/aws-lambda";
import { S3Event, Context } from "aws-lambda";

export const handler: Handler = async (event: S3Event, context: Context) => {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const trackingId = context.awsRequestId;

    console.log("++++++++++++ Pixel Track handler");

    // TODO read image from s3, send it as a response

    return {
        statusCode: 200,
        // headers: { 'Content-Type': 'image/png' },
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({bucketName, trackingId}),
        isBase64Encoded: true,
      };

  } catch (err) {
    console.log("ERROR", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
