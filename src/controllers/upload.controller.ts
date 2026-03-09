import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { s3 } from '../libs/aws/s3';
import { url } from 'inspector/promises';

dotenv.config();

export const getS3PresignUrl = async (req: Request, res: Response) => {
  try {
    const { files } = req.body; // [{ filename, contentType }]

    const presignedUrls = await Promise.all(
      files.map(async ({ filename, contentType }: any) => {
        const key = `properties/${uuidv4()}/${filename}`;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
          ContentType: contentType,
          ChecksumAlgorithm: undefined,
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 min

        return {
          url,
          key,
          fileUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
        };
      })
    );

    res.json(presignedUrls);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate presigned URLs' });
  }
};

export const s3ImageDelete = (req: Request, res: Response) => {
  const imagesDeletion =
    req?.files && Array.isArray(req.files)
      ? req.files.map(async (file: Express.Multer.File) => {
          const params = {
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: file?.originalname,
          };
          const command = new DeleteObjectCommand(params);
          await s3.send(command);

          return url;
        })
      : [];

  Promise.all(imagesDeletion).then((urls) => {
    res.send({ message: 'Images delete successfully' });
  });
};
