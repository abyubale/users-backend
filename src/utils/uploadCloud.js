import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadCloud = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(result.secure_url);
    });
  });
};

export const deleteFromCloud = async (fileUrl) => {
  try {
    const regex = /\/([^\/]+)\.jpg$/;
    const match = fileUrl.match(regex);
    if (match) {
      const fileName = match[1];
      if (fileName) {
        const result = await cloudinary.uploader.destroy(fileName);
        return result;
      }
    } else {
      console.log('No match found.');
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
