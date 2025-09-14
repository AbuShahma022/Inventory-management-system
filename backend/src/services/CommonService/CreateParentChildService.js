import mongoose from "mongoose";

const CreateParentChildService = async (req,PurchaseModel ,PurchaseProductModel ,JoinPropertyName)=>{
    const session = await mongoose.startSession();

    try {
        //Begin Transaction
        await session.startTransaction();

        //Create Parent
        const PurchaseSummery =  req.body["PurchaseSummery"];
        PurchaseSummery.UserEmail = req.header("email");
        const PurchaseSummeryCreation = await PurchaseModel .create([PurchaseSummery],{session});

        //Create Child
        let PurchaseProduct = req.body["PurchaseProduct"];
         await Promise.all(
            PurchaseProduct.map(async (element) => {
                element[JoinPropertyName] = PurchaseSummeryCreation[0]._id;
                element.UserEmail = req.header("email");
            })
        );

        let PurchaseProductCreation = await PurchaseProductModel.insertMany(PurchaseProduct,{session});

        //Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return {status : "success", data : {PurchaseSummery  : PurchaseSummeryCreation , PurchaseProduct : PurchaseProductCreation}};


        

        
    } catch (error) {
        //Abort Transaction
        await session.abortTransaction();
        session.endSession();
        return {status : "error", data : error.toString()};
        
    }

}
export default CreateParentChildService;