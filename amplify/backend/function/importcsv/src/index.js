/* Amplify Params - DO NOT EDIT
	API_AWSISVTRACKER_GRAPHQLAPIENDPOINTOUTPUT
	API_AWSISVTRACKER_GRAPHQLAPIIDOUTPUT
	API_AWSISVTRACKER_GRAPHQLAPIKEYOUTPUT
	API_AWSISVTRACKER_LICENSETABLE_ARN
	API_AWSISVTRACKER_LICENSETABLE_NAME
	ENV
	REGION
	STORAGE_S3AWSISVTRACKERSTORAGEE049A5AD_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const fetch = require('node-fetch');
 const Request = require('node-fetch').Request;
 const aws = require('aws-sdk');
 const s3 = new aws.S3();
 
 const GRAPHQL_ENDPOINT = process.env.API_AWSISVTRACKER_GRAPHQLAPIENDPOINTOUTPUT;
 const GRAPHQL_API_KEY = process.env.API_AWSISVTRACKER_GRAPHQLAPIKEYOUTPUT;
 
 const query = /* GraphQL */ `
   mutation CREATE_LICENSE($input: CreateLicenseInput!) {
     createLicense(input: $input) {
       id
       name
       createdAt
     }
   }
 `;
 
 exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    console.log("key", key)
    const params = {
        Bucket: bucket,
        Key: key,
    };

    let statusCode = 200;
    let body;
    let response;

    try {
        const uploadedCSV = (await s3.getObject(params).promise()).Body.toString('utf-8').split("\n").map(line => line.replace('"', "").replace('"\r', "").split(","));
        console.log("UPLOADED CSV: ", uploadedCSV);
        for(let i = 1; i < uploadedCSV.length; ++i){
            const currArr = uploadedCSV[i];
            let comments = currArr[5];
            if(i === uploadedCSV.length - 1){
                const arrLength = currArr.length - 1;
                currArr[arrLength] = currArr[arrLength].substring(0, currArr[arrLength].length - 1)
                console.log("LAST ITEM IN ARRAY", currArr[arrLength])
            }
            const variables = {
                input: {
                    name: currArr[0],
                    category: currArr[1],
                    purchaseType: currArr[2],
                    licenseTerms: currArr[3],
                    renewalDate: currArr[4],
                    comments: comments,
                }
            }
            try {
                const options = {
                    method: "POST",
                    headers: {
                        'x-api-key': GRAPHQL_API_KEY,
                    },
                    body: JSON.stringify({query, variables})
                };
                const request = new Request(GRAPHQL_ENDPOINT, options);
                console.log(options.body)
                response = await fetch(request)
                body = await response.json();
                if(body.errors) statusCode = 400;
            } catch (error) {
                console.error(error)
                console.log("response received", response)
                statusCode = 400;
                body = {
                    errors: [
                        {
                        status: response.status,
                        message: error.message,
                        stack: error.stack
                            }
                        ]
                    }
                };
            }
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
    return{
        statusCode,
        body: JSON.stringify(body)
    }
 }