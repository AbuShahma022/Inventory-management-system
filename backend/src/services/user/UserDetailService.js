const UserDetails = async (req, dataModel) => {
  try {
    let Data = await dataModel.aggregate([
      { $match: { email: req.headers["email"] } }
    ]);

    return { status: "success", data: Data };
  } catch (error) {
    return { status: "failed", data: error.toString() };
  }
};
export default UserDetails;