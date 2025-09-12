import CustomerModel from "../../model/Customer/CustomerModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";

// Create Customer
const CreateCustomer = async (req, res) => {
    try {
        const result = await CreateService(req, CustomerModel);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ data: error.toString() });
    }   
}

//Update Customer
const UpdateCustomer = async (req, res) => {
    try {
        let result = await UpdateService(req, CustomerModel);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

// List Customer
const ListCustomer = async (req, res) => {
    try {
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx },{ Address: SearchRgx }];
        let result = await ListService(req, CustomerModel, SearchArray);
        res.status(200).json(result);

        
    } catch (error) {
        
        res.status(400).json({ data: error.toString() });
    }
}

const DropDownCustomer = async (req, res) => {
    try {
        let result = await DropDownService(req, CustomerModel,{_id:1, Name:1});
        res.status(200).json(result);
        
    } catch (error) {
        res.status(400).json({ data: error.toString() });
        
    }
}

export {
    CreateCustomer,
    UpdateCustomer,
    ListCustomer,
    DropDownCustomer
}