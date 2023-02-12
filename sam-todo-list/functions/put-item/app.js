const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

exports.putItemHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("Event received by putItemHandler:", event);

  const body = JSON.parse(event.body);
  const id = body.id;
  const name = body.name;

  const response = {};

  try {
    const params = {
      TableName: tableName,
      Item: { id: id, name: name },
    };

    await docClient.put(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (ResourceNotFoundException) {
    response = {
      statusCode: 404,
      body: "Unable to call DynamoDB. Table resource not found.",
    };
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
