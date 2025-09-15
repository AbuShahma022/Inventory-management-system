const DeleteService = async (req, Model) => {
    try {
        let deleteId = req.params.id;
        let userEmail = req.headers['email'];
        let queryObject = {};
        queryObject["_id"] = deleteId;
        queryObject["UserEmail"] = userEmail;

        let Delete = await Model.deleteMany(queryObject);
        return { status: "success", data: Delete };
        
    } catch (error) {
        return { status: "failed", data: error.toString() };
        
    }
}
export default DeleteService;