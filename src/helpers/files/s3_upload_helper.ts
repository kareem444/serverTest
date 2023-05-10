// import { S3 } from 'aws-sdk';

// export default async function uploadToS3(
//     file: Express.Multer.File,
// ): Promise<S3.ManagedUpload.SendData> {
//     const { originalname } = file;
//     const bucketS3 = process.env.AWS_BUCKET_S3;
//     return await upload(file.buffer, bucketS3, originalname);
// }

// const upload = async (
//     buffer: Buffer,
//     bucket: string,
//     name: string,
// ): Promise<S3.ManagedUpload.SendData> => {
//     const s3 = getS3();
//     const params: S3.Types.PutObjectRequest = {
//         Bucket: bucket,
//         Key: String(name),
//         Body: buffer,
//         ACL:"public-read"
//     };
//     return new Promise<S3.ManagedUpload.SendData>((resolve, reject) => {
//         s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
//             if (err) {
//                 console.error(err);
//                 reject(err.message);
//             }
//             resolve(data);
//         });
//     });
// };

// const getS3 = () => {
//     return new S3({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     });
// };



import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3"

export const uploadToS3 = async (file: Express.Multer.File) => {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_BUCKET_S3;
    const s3 = getS3();
    const params: PutObjectCommandInput = {
        Bucket: bucketS3,
        Key: String(originalname),
        Body: file.buffer,
        ACL: "public-read"
    };
    return new Promise((resolve, reject) => {
        s3.send(new PutObjectCommand(params), (err, data) => {
            if (err) {
                console.error(err);
                reject(err.message);
            }
            resolve(data);
        });
    }
    );
}

const getS3 = () => {
    return new S3Client({
        region: process.env.AWS_S3_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
}