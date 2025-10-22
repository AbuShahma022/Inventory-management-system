import { uploadToImgBB } from "../../utility/ImageUpload.js";

const CreateUser = async (req, dataModel) => {
  try {
    let Data = req.body;

    // Upload image to ImgBB if provided
    if (Data.photo) {
      const imageUrl = await uploadToImgBB(Data.photo);
      Data.photo = imageUrl; // replace base64 with URL
    }

    // Save user in database
    const newUser = await dataModel.create(Data);

    return { status: "success", data: newUser };
  } catch (error) {
    console.error("CreateUser Error:", error);
    return { status: "failed", data: error.message };
  }
};

export default CreateUser;
