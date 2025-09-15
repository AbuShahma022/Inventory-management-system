import mongoose from "mongoose";

const deleteParentChildService = async (req,ParentModel,ChildModel,JoinPropertyName) =>{
    const session = await mongoose.startSession();

    try {
        // Start a transaction
       await session.startTransaction();

       
       let Deleteid = req.params.id;
       let UserEmail = req.headers['email']

       let ChildQueryObject = {};
         ChildQueryObject[JoinPropertyName] = Deleteid;
         ChildQueryObject["UserEmail"] = UserEmail;

         let ParentQueryObject = {};
            ParentQueryObject["_id"] = Deleteid;
            ParentQueryObject["UserEmail"] = UserEmail;

        // Delete child documents
       let ChildsDelete = await ChildModel.deleteMany(ChildQueryObject).session(session);
        // Delete parent document
       let ParentDelete= await ParentModel.deleteOne(ParentQueryObject).session(session);
         // Commit Transaction
        await session.commitTransaction();
        session.endSession();

         return {status: "success",Parent:ParentDelete,Childs:ChildsDelete}

 } catch (error) {
        
         // Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: error.toString()}

    }

}

export default deleteParentChildService;