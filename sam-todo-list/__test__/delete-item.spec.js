const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const lambda = require("../functions/delete-item.js");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Test delete-item", () => {
  beforeAll(() => {
    ddbMock.reset();
  });

  it("should delete item", async () => {
    const body = {
      id: "id1",
    };
    const event = {
      httpMethod: "DELETE",
      body: JSON.stringify(body),
    };

    ddbMock.on(DeleteCommand).resolves({});

    const result = await lambda.handler(event);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(body),
    };

    expect(result).toEqual(expectedResult);
  });
});
