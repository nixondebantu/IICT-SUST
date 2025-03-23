import "dotenv/config";

const config = {
  db: {
    url: process.env.DATABASE_URL,
  },
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    imageUploadPreset: process.env.CLOUDINARY_IMAGE_UPLOAD_PRESET,
    assetUploadPreset: process.env.CLOUDINARY_ASSETS_UPLOAD_PRESET,
  },
};

export default config;