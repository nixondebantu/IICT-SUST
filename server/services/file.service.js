import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import config from "../config/index.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    upload_preset: config.cloudinary.imageUploadPreset,
  }),
});

const assetStorage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    upload_preset: config.cloudinary.assetUploadPreset,
  }),
});

const imageUpload = multer({ storage: imageStorage });
const assetUpload = multer({ storage: assetStorage });

exports = { imageUpload, assetUpload, cloudinary };
