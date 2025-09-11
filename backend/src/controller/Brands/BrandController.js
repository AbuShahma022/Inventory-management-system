import DataModel from "../../model/Brands/BrandsModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import ListService from "../../services/CommonService/ListService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";

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

export {
    CreateBrand,
    UpdateBrand,
    ListBrand,
    DropDownBrand
};