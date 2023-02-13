const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const tableName = process.env.SAMPLE_TABLE;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  if (event.httpMethod !== "DELETE") {
    throw new Error(
      `this function only accepts DELETE method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("Event received by delete-item");

  const body = JSON.parse(event.body);
  const id = body.id;

  let response = {};

  try {
    const params = {
      TableName: tableName,
      Item: { id: id },
    };

    await dynamo.send(new DeleteCommand(params));

    response = {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (resourceNotFoundException) {
    console.error("-- Error in delete-item");
    console.error(resourceNotFoundException);
    response = {
      statusCode: 404,
      body: "Resource not found in DB.",
    };
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
