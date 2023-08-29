import { S3Client, S3Client } from "@aws-sdk/client-s3";

const REGION = "us-east-2";
const S3Client =  new S3Client({region: REGION});
export {S3Client};