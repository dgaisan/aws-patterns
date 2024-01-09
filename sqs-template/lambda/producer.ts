exports.handler = async (event: any): Promise<string> => {
  console.log("Sending a message to a queue");

  const { QUEUE_URL: QueueUrl } = process.env;

  const AWS = require("aws-cdk");
  const sqs = new AWS.SQS();

  await sqs
    .sendMessage({
      QueueUrl,
      MessageBody: "Some message",
    })
    .promise();

  return "Message has been sent to a Queue";
};
