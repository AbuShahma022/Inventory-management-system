import SupplierModel from "../../model/Supplier/SupplierModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";

const CreateSupplier = async (req, res) => {
    try {
        const result = await CreateService(req, SupplierModel);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}
const UpdateSupplier = async (req, res) => {
    try {
        let result = await UpdateService(req, SupplierModel);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

const ListSupplier = async (req, res) => {
    try {
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx },{ Address: SearchRgx }];
        let result = await ListService(req, SupplierModel, SearchArray);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

const DropDownSupplier = async (req, res) => {
    try {
        let result = await DropDownService(req, SupplierModel,{_id:1, Name:1,});
        res.status(200).json(result);

        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

export {
    CreateSupplier,
    UpdateSupplier,
    ListSupplier,
    DropDownSupplier
}