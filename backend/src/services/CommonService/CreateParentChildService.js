import mongoose from "mongoose";

const CreateParentChildService = async (req,PurchaseModel ,PurchaseProductModel ,JoinPropertyName)=>{
    const session = await mongoose.startSession();

    try {
        //Begin Transaction
        await session.startTransaction();

        //Create Parent
        const Parent=  req.body["Parent"];
        Parent.UserEmail = req.header("email");
        const ParentCreation = await PurchaseModel .create([Parent],{session});

        //Create Child
        let Child = req.body["Child"];
         await Promise.all(
            Child.map(async (element) => {
                element[JoinPropertyName] = ParentCreation[0]._id;
                element.UserEmail = req.header("email");
            })
        );

        let ChildCreation = await PurchaseProductModel.insertMany(Child,{session});

        //Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return {status : "success", data : {Parent : ParentCreation , Child : ChildCreation}};


        

        
    } catch (error) {
        //Abort Transaction
        await session.abortTransaction();
        session.endSession();
        return {status : "error", data : error.toString()};
        
    }

}
export default CreateParentChildService;