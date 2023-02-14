const { mockClient } = require("aws-sdk-client-mock");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

const lambda = require("../functions/get-all-items.js");

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Test get-all-items", () => {
  const items = [
    { id: "id1", name: "item1" },
    { id: "id2", name: "item2" },
  ];

  beforeAll(() => {
    ddbMock.reset();
  });

  it("should return items", async () => {
    const event = {
      httpMethod: "GET",
    };

    ddbMock.on(ScanCommand).resolves({
      Items: items,
    });

    const result = await lambda.handler(event);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify(items),
    };

    expect(result).toEqual(expectedResult);
  });
});
