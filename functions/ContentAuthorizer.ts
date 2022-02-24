import { CloudFrontEvent } from "./types/CloudFrontFunctionEvent";

const handler = async (event: CloudFrontEvent) => {
    console.log('Event: ', JSON.stringify(event));
    return {
        statusCode: 401,
        statusDescription: 'Unauthorized'
    }
}