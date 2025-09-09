const UpdateUser = async (req, dataModel) => {
  try {
    let result = await dataModel.updateOne(
      { email: req.headers["email"] }, // filter by email
      req.body                          // new data from client
    );

    return { status: "success", data: result };
  } catch (error) {
    return { status: "failed", data: error.toString() };
  }
};
export default UpdateUser;