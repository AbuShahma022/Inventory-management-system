const DropDownService = async(req, DataModel,Projection) => {
    try {
        let UserEmail = req.headers["email"];
        let data = await DataModel.aggregate([
            {$match: {UserEmail : UserEmail}},
            {$project: Projection}
        ])
        return {status: "success", data: data}
    } catch (error) {
        return {status: "failed", data: error.toString()}
        
    }

}
export default DropDownService;