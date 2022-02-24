import { CloudFrontRequestEvent } from "aws-lambda";

const edgeErrorResponse = (statusCode: number, error: string) => {
    const responseBody = {
        errorMessage: error
    };

    return {
        status: statusCode,
        headers: {
            'cache-control': [
                {
                    key: 'Cache-Control',
                    value: 'max-age=100'
                }
            ],
            'content-type': [
                {
                    key: 'Content-Type',
                    value: 'text/html'
                }
            ],
            'content-encoding': [
                {
                    key: 'Content-Encoding',
                    value: 'UTF-8'
                }
            ]
        },
        body: JSON.stringify(responseBody)
    };
};

export const handler = async (event: CloudFrontRequestEvent) => {
    console.log('Event: ', JSON.stringify(event));
    const request = event.Records[0].cf.request;
    const authHeaders = request.headers['authorization'];
    if (!authHeaders) {
        return edgeErrorResponse(401, 'Unauthorized');
    }
    const token = authHeaders[0].value;
    if(token !== 'token') {
        return edgeErrorResponse(401, 'Unauthorized');
    }
    return request;
};

