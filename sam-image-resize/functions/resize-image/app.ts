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
            const file = s3.object.key;

            const fileFromS3Params = {
                Bucket: s3.bucket.name,
                Key: s3.object.key,
            };
            const fileFromS3 = await s3Client.getObject(fileFromS3Params);
            const tempImageFile = `${os.tmpdir()}/${crypto.randomUUID()}.jpg`;
            const imageResizeParams = {
                srcData: fileFromS3.Body,
                dstPath: tempImageFile,
                width: 100, // Resizing original image width to 100px
            };

            await resizeImageAsync(imageResizeParams);

            const resizedFile = await readFileAsync(tempImageFile);
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
