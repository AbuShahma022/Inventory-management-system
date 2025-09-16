import DataModel from "../../model/Brands/BrandsModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import ListService from "../../services/CommonService/ListService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";
import ProductModel from "../../model/Products/ProductModel.js";


// Create Brand
const CreateBrand = async (req,res)=>{
    let result = await CreateService(req,DataModel);
    return res.status(200).json(result);
    
}
//update Brand
const UpdateBrand = async (req,res)=>{
    let result = await UpdateService(req,DataModel);
    return res.status(200).json(result);
}

// List Brand
const ListBrand = async (req,res)=>{
    let SearchRgx = {$reges:req.params.searchKeyword,$options:"i"}
    let SearchArray = {name:SearchRgx}
    let result = await ListService(req,DataModel,SearchArray);
    return res.status(200).json(result);

}

// DropDown Brand
const DropDownBrand = async (req,res)=>{
    let result = await DropDownService(req,DataModel,{_id:1, Name:1});
    return res.status(200).json(result);
}

//DetailByid Brand
const BrandDetailsById=async (req, res) => {
    let Result= await DetailById(req,DataModel)
    res.status(200).json(Result)
}

const DeleteBrand = async (req,res)=>{
    let DeleteId = req.params.id;
    
    let CheckAssociate = await CheckAssociationService( { BrandId:DeleteId },ProductModel);

    if (CheckAssociate){
        return res.status(200).json({status:"associate",message:"This Brand is associated with other Product, you can not delete this."});
    } else{
        let Result = await DeleteService(req,DataModel);
        return res.status(200).json(Result);
    }
    

}

export {
    CreateBrand,
    UpdateBrand,
    ListBrand,
    DropDownBrand,
    DeleteBrand,
    BrandDetailsById
};