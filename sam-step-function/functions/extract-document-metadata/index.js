import { PDFDocument } from 'pdf-lib';
import { S3 } from '@aws-sdk/client-s3';

const S3_SOURCE = 'aws.s3';

const s3 = new S3();

export const handler = async (event) => {
    console.info('Extracting metadata from a PDF document.');

    validateEventObject(event);

    let pdfMetadata;
    const s3ObjectKey = event.detail.object.key,
        s3BucketName = event.detail.bucket.name;

    try {
        const s3Object = await s3.getObject({
            Key: s3ObjectKey,
            Bucket: s3BucketName
        });
        const fileData = await s3Object.Body.transformToByteArray();
        const pdfDoc = await PDFDocument.load(fileData, { updateMetadata: false });

        pdfMetadata = getPdfMetadata(pdfDoc);
        console.log(pdfMetadata);
    } catch (err) {
        console.log(err);
    }

    return {
        metadata: pdfMetadata,
        inputParams: {
            key: s3ObjectKey,
            bucket: s3BucketName 
        }
    };
};

const validateEventObject = event => {
    if (!event || !event.detail || !event.detail.bucket || !event.detail.object) {
        throw new Error('Invalid event.');
    }
    if (event.source !== S3_SOURCE) {
        throw new Error('Invalid event source. Expecting S3.');
    }
};

const getPdfMetadata = pdfDoc => ({
    author: pdfDoc.getAuthor(),
    createdDate: pdfDoc.getCreationDate(),
    keywords: pdfDoc.getKeywords(),
    producer: pdfDoc.getProducer(),
    subject: pdfDoc.getSubject(),
    title: pdfDoc.getTitle()
});
