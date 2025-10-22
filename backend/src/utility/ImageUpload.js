import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

export const uploadToImgBB = async (imageBase64) => {
  try {
    const formData = new FormData();
    formData.append("image", imageBase64);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData
    );

    return response.data.data.url; // This is the image URL
  } catch (error) {
    console.error("ImgBB upload failed:", error.message);
    throw new Error("Image upload failed");
  }
};
