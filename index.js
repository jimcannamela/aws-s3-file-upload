import { s3Client } from "./s3client.js";
import { PutObjectCommand, CreateBucketCommand, PutBucketPolicyCommand } from "@aws-sdk/client-s3";

const params = { 
    Bucket: "jimcs3bucketsdi1",
    Key: "sample_upload.txt",
    Body: "Hello World!"
};

// Part 2
// Objective
// Use the following resources to find a way to change your code from the previous exercise to programmatically make your file publicly accessible.

const publicAccessPolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicAccessPolicy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion"
            ],
            "Resource": "arn:aws:s3:::jimcs3bucketsdi1/*"
        }
    ]
}

const createBucketAndUploadFile = async () => {
    try {
        const data =  await s3Client.send(new CreateBucketCommand({ Bucket: params.Bucket }));
        console.log("Successfully created a bucket called ", data.Location);

        await s3Client.send(new PutObjectCommand(params));
        console.log(
        "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );

    } catch (err) {
        console.log("Error creating bucket", err);
    }
}

const applyAccessPolicy = async () => {
    const applyPolicy = new PutBucketPolicyCommand( { Policy: JSON.stringify(publicAccessPolicy), Bucket: params.Bucket } );
    try {
        const response = await s3Client.send(applyPolicy);
        console.log("Policy successfully applied");
    } catch (err) {
        console.log("Error applying policy", err);
    }

}


// createBucketAndUploadFile();
applyAccessPolicy();

// #########################
// #     End of Script     #
// #########################