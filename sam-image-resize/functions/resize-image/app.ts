import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import { S3 } from '@aws-sdk/client-s3';
import { S3Event } from 'aws-lambda';
import * as ImageMagick from 'imagemagick';
const fsPromises = require('fs').promises;

const DONE = 'done.';
const FAILED = 'failed.';

const s3Client = new S3({});

export const lambdaHandler = async (event: S3Event): Promise<string> => {
    let response: string;

    console.info('------ Lambda captured file(s) upload event ---------');

    if (!event || !event.Records || !event.Records.length) {
        console.error('Required event input is missing');
        return FAILED;
    }

    try {
        for (const record of event.Records) {
            const { s3 } = record;

            if (!s3 || !s3.bucket || !s3.object) {
                continue;
            }

            const originalFileName = s3.object.key;
            const originalBucketName = s3.bucket.name;

            const tempImagePath = await generateResizedImage(originalBucketName, originalFileName);
            const resizedFile = await fsPromises.readFile(tempImagePath);
            const resizedImageFileName = `${originalFileName}-small.jpg`;

            const putFileS3Params = {
                Bucket: originalBucketName,
                Key: resizedImageFileName,
                Body: resizedFile,
            };
            await s3Client.putObject(putFileS3Params);
        }

        response = DONE;
    } catch (err: unknown) {
        console.error(err);
        response = FAILED;
    }

    return response;
};

async function generateResizedImage(bucketName: string, fileName: string): Promise<string> {
    console.log('--- generateResizedImage --', bucketName, fileName);

    const getFileS3Params = {
        Bucket: bucketName,
        Key: fileName,
    };

    const fileFromS3 = await s3Client.getObject(getFileS3Params);

    const tempImagePath = `${os.tmpdir()}/${crypto.randomUUID()}.jpg`;
    console.log(`--- creating tempfile: ${tempImagePath} --`);
    const imageResizeParams = {
        srcData: fileFromS3.Body,
        dstPath: tempImagePath,
        width: 100, // Resizing original image width to 100px
    };

    await resizeImageAsync(imageResizeParams);

    return tempImagePath;
}

function resizeImageAsync(imageResizeParams: any) {
    console.log('--- resizeImageAsync --');
    return new Promise((resolve, reject) => {
        ImageMagick.convert(imageResizeParams, (err, stdout) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    });
}
