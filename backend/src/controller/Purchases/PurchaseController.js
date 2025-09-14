import PurchaseModel  from "../../model/Purchases/PurchasesModel.js";
import PurchaseProductModel  from "../../model/Purchases/PurchaseProductModel.js";
import CreateParentChildService from "../../services/CommonService/CreateParentChildService.js";
import ListOneService from "../../services/CommonService/ListOneService.js";

 const CreatePurchase = async (req,res)=>{
    let result = await CreateParentChildService(req,PurchaseModel,PurchaseProductModel,"PurchaseId");
    res.status(200).json(result);
}

const PurchaseList = async (req,res)=>{
    let SearchRgx = { $regex: req.params.searchKeyword, $options: 'i' };
    let JoinStage = {$lookup: {from : "suppliers",localField : "SupplierId", foreignField : "_id", as : "Suppliers"}};
    let SearchArray = [{"Note": SearchRgx},{"Suppliers.Name": SearchRgx},{"Suppliers.Phone": SearchRgx},{"Suppliers.email": SearchRgx}];

    let result = await ListOneService(req,PurchaseModel,SearchArray,JoinStage);
    res.status(200).json(result);
}

export {
    CreatePurchase,
    PurchaseList
}

