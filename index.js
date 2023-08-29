import { s3Client } from "./s3client.js";
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

const params = { 
    Bucket: "jimcs3bucketsdi1",
    Key: "sample_upload.txt",
    Body: "Hello World!"
};

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
        console.log("Error", err);
    }
}

createBucketAndUploadFile();