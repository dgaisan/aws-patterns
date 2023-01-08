import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const tableName = process.env.DYNAMO_DB_TABLE;
const client = new DynamoDBClient();
const dynamoDbDocument = DynamoDBDocument.from(client);

export const handler = async (event) => {
    return {};
};