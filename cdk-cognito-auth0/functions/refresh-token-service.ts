import { Handler } from "aws-cdk-lib/aws-lambda";
import * as lambda from "@aws-cdk/aws-lambda";

export const handler: Handler = async (event: any) => {
  console.log("---- Refresh Token eventHandler");
  console.log(event);

  const response = {
    statusCode: 200,
    headers: {},
    body: JSON.stringify({ message: "success" }),
  };

  try {
    const method = event.httpMethod;
    if (method !== 'GET') {
      return createBadResponse("support only GET method");
    }
  } catch (error) {
    
  }

  console.log("++++ providing response");
  console.log(response);

  return response;
};

function createBadResponse(body: object | string) {
  return {
    statusCode: 400,
    headers: {},
    body: JSON.stringify(body)
  }
}
