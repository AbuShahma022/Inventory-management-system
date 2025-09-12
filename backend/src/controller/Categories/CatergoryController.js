import CategoriesModel from "../../model/Categories/CategoriesModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";

// Create Category
const CreateCategory = async (req, res) => {
    try {
        const result = await CreateService(req, CategoriesModel);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}
// Update Category
const UpdateCategory = async (req, res) => {
    try {
        let result = await UpdateService(req, CategoriesModel);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

// List Category
const ListCategory = async (req, res) => {
    try {
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }];
        let result = await ListService(req, CategoriesModel, SearchArray);
        res.status(200).json(result);



    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

// Dropdown Category
const DropDownCategory = async (req, res) => {
    try {
        let result = await DropDownService(req, CategoriesModel,{_id:1, Name:1});
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

export {
    CreateCategory,
    UpdateCategory,
    ListCategory,
    DropDownCategory
}