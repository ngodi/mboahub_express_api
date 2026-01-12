import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { s3ImageDelete, s3ImageUpload } from '../controllers/upload.controller';
import { upload } from '../libs/multerUploader';

export const uploadRouter = Router();

uploadRouter.post(
  '/images',
  isAuthenticated,
  upload.array('images', 10),
  s3ImageUpload
);

uploadRouter.delete(
  '/images',
  isAuthenticated,
  upload.array('images', 10),
  s3ImageDelete
);
