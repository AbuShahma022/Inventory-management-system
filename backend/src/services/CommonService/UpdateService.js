const UpdateService = async (req,DataModel)=>{
    try {
        let id = req.params.id;
        let UserEmail = req.headers["email"];
        let PostBody = req.body;
        let data = await DataModel.updateOne({_id: id, UserEmail: UserEmail}, PostBody);
        return {status: "success", data: data}
        
    } catch (error) {
        return {status: "failed", data: error.toString()}
        
    }

}
export default UpdateService;