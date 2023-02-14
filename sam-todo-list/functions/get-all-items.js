const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");

const tableName = process.env.SAMPLE_TABLE;

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  console.info("Event received by get-all-items");

  let response = {};

  try {
    const params = {
      TableName: tableName,
    };

    console.info(`Starting a scan of ${tableName}`);
    const data = await dynamo.send(new ScanCommand(params));
    const items = data.Items;

    response = {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (resourceNotFoundException) {
    console.error("-- Error in get-all-items");
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
