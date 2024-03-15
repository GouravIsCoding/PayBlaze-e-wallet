import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Env } from "..";

cloudinary.config({
  cloud_name: Env.ClOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadOnCloudinary = async (filePath: string) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      allowed_formats: ["jpg", "png"],
      folder: "PayBlaze",
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
