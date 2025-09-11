const CreateService = async (req,DataModel)=>{
    try {
        let PostBody = req.body;
        PostBody.UserEmail = req.headers["email"]
       let data = await DataModel.create(PostBody);
       return {status: "success", data: data}
    } catch (error) {
        return {status: "failed", message: error.toString()}
        
    }
}
export default CreateService;