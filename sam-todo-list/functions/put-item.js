const {
  DynamoDBClient,
  BatchExecuteStatementCommand,
} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const tableName = process.env.SAMPLE_TABLE;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("Event received by putItemHandler:", event);

  const body = JSON.parse(event.body);
  const id = body.id;
  const name = body.name;

  let response = {};

  try {
    const params = {
      TableName: tableName,
      Item: { id: id, name: name },
    };

    await dynamo.send(new PutCommand(params));

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
