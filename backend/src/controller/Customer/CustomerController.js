import CustomerModel from "../../model/Customer/CustomerModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import SalesModel from "../../model/Sales/SalesModel.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";


// Create Customer
const CreateCustomer = async (req, res) => {
    
        const result = await CreateService(req, CustomerModel);
        res.status(200).json(result);
    
}

//Update Customer
const UpdateCustomer = async (req, res) => {
    
        let result = await UpdateService(req, CustomerModel);
        res.status(200).json(result);
        
   
}

// List Customer
const ListCustomer = async (req, res) => {
    
        let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
        let SearchArray = [{ Name: SearchRgx }, { Email: SearchRgx }, { Phone: SearchRgx },{ Address: SearchRgx }];
        let result = await ListService(req, CustomerModel, SearchArray);
        res.status(200).json(result);

        
   
}

//DetailById Customer
const DetailByIdCustomer = async (req, res) => {
    
        let result = await DetailById(req, CustomerModel);
        res.status(200).json(result);
        
   
}

//dropdown

const DropDownCustomer = async (req, res) => {
    
        let result = await DropDownService(req, CustomerModel,{_id:1, Name:1});
        res.status(200).json(result);
        
   
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
    DeleteCustomer,
    DetailByIdCustomer
}