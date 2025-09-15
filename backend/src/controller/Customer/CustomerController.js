import CustomerModel from "../../model/Customer/CustomerModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import SalesModel from "../../model/Sales/SalesModel.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";


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

const DeleteCustomer = async (req,res)=>{
    let DeleteId = req.params.id;
    
    let CheckAssociate = await CheckAssociationService({CustomerId:DeleteId},SalesModel);
    if (CheckAssociate){
        return res.status(200).json({status:"associate",message:"This Customer is associated with other Sales, you can not delete this."});

    }else {
        let Result = await DeleteService(req,CustomerModel);
        return res.status(200).json(Result);
    }
}

export {
    CreateCustomer,
    UpdateCustomer,
    ListCustomer,
    DropDownCustomer,
    DeleteCustomer
}