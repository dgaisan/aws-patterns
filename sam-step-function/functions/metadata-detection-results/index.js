export const handler = async (event) => {
    console.info('Receiving text detection results.');

    return {
        ...event,
        textDetection: await getTextDetectionResults(event)
    };
};

const getTextDetectionResults = async event => {
    return new Promise.resolve(true); // placeholder
};