import cloudinary from "cloudinary"
import dotenv from "dotenv"
import fs from "fs";

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(filePath, (error, result) => {
        fs.unlinkSync(filePath);
        if (error) {
            console.log(error)
            reject(error)}
        else resolve(result)
      })
      
    })
}
  