import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import {
  getS3PresignUrl,
  s3ImageDelete,
} from '../controllers/upload.controller';
import { upload } from '../libs/multerUploader';

export const uploadRouter = Router();

uploadRouter.post(
  '/presigned-urls',
  isAuthenticated,
  upload.array('images', 10),
  getS3PresignUrl
);

uploadRouter.delete(
  '/images',
  isAuthenticated,
  upload.array('images', 10),
  s3ImageDelete
);
