const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

const tableName = process.env.SAMPLE_TABLE;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `this function only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("Event received by put-item");

  const body = JSON.parse(event.body);
  const id = body.id || randomUUID();
  const name = body.name;

  console.info("New Item?", body.id ? "yes" : "no");
  console.info("Item name:", name);

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
  } catch (resourceNotFoundException) {
    console.error("-- Error in put-item");
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
