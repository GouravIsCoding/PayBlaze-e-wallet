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
    return null;
  }
};
export const destroyOnCloudinary = async (fileId: string) => {
  try {
    if (!fileId) return null;

    const response = await cloudinary.uploader.destroy(fileId, {
      resource_type: "image",
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
