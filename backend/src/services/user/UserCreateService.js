const CreateUser = async (req, dataModel) => {
  try {
    let Data = req.body; // take user input from request body
    
    // save user in database
    let newUser = await dataModel.create(Data);

    return newUser; 
  } catch (error) {
    return {status : "failed", data : error.tostring()};
  }
};
export default CreateUser;