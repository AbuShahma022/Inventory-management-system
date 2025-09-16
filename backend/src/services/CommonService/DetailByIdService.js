import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const DetailById = async (req,DataModel)=>{
    try {
         let DetailsId=req.params.id;
        let UserEmail=req.headers['email'];

       let QueryObject = {};
        QueryObject["_id"] = new ObjectId(DetailsId);
        QueryObject["UserEmail"] = UserEmail;

        let data = await DataModel.aggregate([
            {$match: QueryObject}
        ])

        return {status: "success", data: data}

        
    } catch (error) {
         return {status: "fail", data: error.toString()}
        
    }
}

export default DetailById