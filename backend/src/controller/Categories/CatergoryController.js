import CategoriesModel from "../../model/Categories/CategoriesModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";
import ProductModel from "../../model/Products/ProductModel.js";


// Create Category
const CreateCategory = async (req, res) => {
    
        const result = await CreateService(req, CategoriesModel);
        res.status(200).json(result);
        
   
}
// Update Category
const UpdateCategory = async (req, res) => {
    
        let result = await UpdateService(req, CategoriesModel);
        res.status(200).json(result);
}

// List Category
const ListCategory = async (req, res) => {
    
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }];
        let result = await ListService(req, CategoriesModel, SearchArray);
        res.status(200).json(result);



    
}

//DetailById Category
const DetailByIdCategory = async (req, res) => {
    
        let result = await DetailById(req, CategoriesModel);
        res.status(200).json(result);
        
   
}

// Dropdown Category
const DropDownCategory = async (req, res) => {
    
        let result = await DropDownService(req, CategoriesModel,{_id:1, Name:1});
        res.status(200).json(result);
        
  
}

const DeleteCategory = async (req, res) => {
    let DeleteId = req.params.id;
    
    let CheckAssociate = await CheckAssociationService({CategoryId:DeleteId},ProductModel);
    if (CheckAssociate) {
        return res.status(200).json({ status: "associate", message: "This Category is associated with other Product, you can not delete this." });
    }else {
        let Result = await DeleteService(req, CategoriesModel);
        return res.status(200).json(Result);
    }
}
export {
    CreateCategory,
    UpdateCategory,
    ListCategory,
    DropDownCategory,
    DeleteCategory,
    DetailByIdCategory
}