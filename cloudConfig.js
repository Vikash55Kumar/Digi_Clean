const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    // By default same name cloud_name, api_name, api_secret
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'some-folder-name',
      allowerdFormats: ["png", "jpg", "jpeg"], // supports promises as well image type
    },
  });

module.exports = {
    cloudinary,
    storage,
}
