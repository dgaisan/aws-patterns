const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const lambda = require("../functions/put-item.js");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Test put-item", () => {
  beforeAll(() => {
    ddbMock.reset();
  });

  it("should update item", async () => {
    const body = {
      id: "id1",
      name: "name1",
    };
    const event = {
      httpMethod: "POST",
      body: JSON.stringify(body),
    };

    ddbMock.on(PutCommand).resolves({});

    const result = await lambda.handler(event);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(body),
    };

    expect(result).toEqual(expectedResult);
  });
});
