import { uploadToImgBB } from "../../utility/ImageUpload.js";

const UpdateUser = async (req, dataModel) => {
  try {
    let updateData = { ...req.body };
    

    // If the user is updating their photo and it's base64, upload to ImgBB
    if (updateData.photo && updateData.photo.startsWith("/9j/")) {
      const imageUrl = await uploadToImgBB(updateData.photo);
      
      updateData.photo = imageUrl; // replace base64 with uploaded URL
    }

    // Update user by email
    const result = await dataModel.updateOne(
      { email: req.headers["email"] },
      updateData
    );

    return { status: "success", data: result };
  } catch (error) {
    console.error("UpdateUser Error:", error);
    return { status: "failed", data: error.toString() };
  }
};

export default UpdateUser;
