import SupplierModel from "../../model/Supplier/SupplierModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import PurchasesModel from "../../model/Purchases/PurchasesModel.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";


const CreateSupplier = async (req, res) => {
    
        const result = await CreateService(req, SupplierModel);
        res.status(200).json(result);
        
   
        
}
const UpdateSupplier = async (req, res) => {
    
        let result = await UpdateService(req, SupplierModel);
        res.status(200).json(result);
        
   
}

const ListSupplier = async (req, res) => {
    
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx },{ Address: SearchRgx }];
        let result = await ListService(req, SupplierModel, SearchArray);
        res.status(200).json(result);
        
  
}

const DetailSupplier = async (req, res) => {
    let result = await DetailById(req, SupplierModel);
    return res.status(200).json(result);
}

const DropDownSupplier = async (req, res) => {
    
        let result = await DropDownService(req, SupplierModel,{_id:1, Name:1,});
        res.status(200).json(result);

   
}

const DeleteSupplier = async (req, res) => {
    let DeleteId = req.params.id;
    
    let AssociationPurchase = await CheckAssociationService({SupplierId:DeleteId},PurchasesModel);
    if(AssociationPurchase){
        res.status(200).json({status:"error", message:"This Supplier is associated with Purchases. You cannot delete this Supplier."});

    } else {
        let result = await DeleteService(req, SupplierModel);
        res.status(200).json(result);
    }
}

export {
    CreateSupplier,
    UpdateSupplier,
    ListSupplier,
    DropDownSupplier,
    DeleteSupplier,
    DetailSupplier
}