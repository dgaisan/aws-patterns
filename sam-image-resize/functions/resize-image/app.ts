import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import { S3 } from '@aws-sdk/client-s3';
import { APIGatewayProxyEvent, APIGatewayProxyResult, S3Event } from 'aws-lambda';
const im = require('imagemagick');
const promisify = require('promisify');

const resizeImageAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);

const s3Client = new S3({
    region: 'us-east-1',
});

export const lambdaHandler = async (event: S3Event): Promise<APIGatewayProxyResult> => {
    let response: APIGatewayProxyResult;

    console.info('------ Lambda captured file(s) upload event ---------');

    try {
        event.Records.map(async (record) => {
            const { s3 } = record;
            const originalFileName = s3.object.key;
            const originalBucketName = s3.bucket.name;

            const tempImagePath = await generateResizedImage(originalBucketName, originalFileName);
            const resizedFile = await readFileAsync(tempImagePath);
            const resizedImageFileName = `${originalFileName}-small.jpg`;

            const putFileS3Params = {
                Bucket: originalBucketName,
                Key: resizedImageFileName,
                Body: resizedFile,
            };
            await s3Client.putObject(putFileS3Params);
        });

        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'image(s) resizing complete',
            }),
        };
    } catch (err: unknown) {
        console.error(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: err instanceof Error ? err.message : 'some error happened',
            }),
        };
    }

    return response;
};

async function generateResizedImage(bucketName: string, fileName: string): Promise<string> {
    const getFileS3Params = {
        Bucket: bucketName,
        Key: fileName,
    };
    const fileFromS3 = await s3Client.getObject(getFileS3Params);

    const tempImagePath = `${os.tmpdir()}/${crypto.randomUUID()}.jpg`;
    const imageResizeParams = {
        srcData: fileFromS3.Body,
        dstPath: tempImagePath,
        width: 100, // Resizing original image width to 100px
    };

    await resizeImageAsync(imageResizeParams);

    return tempImagePath;
}
