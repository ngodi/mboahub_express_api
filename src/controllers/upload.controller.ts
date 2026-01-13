import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import sharp from 'sharp';
import { s3 } from '../libs/aws/s3';
import { url } from 'inspector/promises';

export const s3ImageUpload = async (req: Request, res: Response) => {
  const imageUrls =
    req?.files && Array.isArray(req.files)
      ? req.files.map(async (file: Express.Multer.File) => {
          const buffer = await sharp(file?.buffer)
            .resize({ height: 1920, width: 1080, fit: 'contain' })
            .toBuffer();

          const params = {
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: file?.originalname,
            Body: buffer,
            ContentType: file?.mimetype,
          };
          const command = new PutObjectCommand(params);
          await s3.send(command);

          const getObjectParams = {
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: file?.originalname,
          };

          const getCommand = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, getCommand);

          return url;
        })
      : [];

  Promise.all(imageUrls).then((urls) => {
    res.send({ imageUrls: urls });
  });
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
