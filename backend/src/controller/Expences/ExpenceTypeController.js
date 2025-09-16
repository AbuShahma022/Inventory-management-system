import ExpenceTypeModel from "../../model/Expences/ExpenceTypeModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import ExpenseModel from "../../model/Expences/ExpenseModel.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";




const CreateExpenceType = async (req, res) => {
    let result = await CreateService(req, ExpenceTypeModel);
    res.status(200).json(result);

}

const UpdateExpenceType = async (req, res) => {
    let result = await UpdateService(req, ExpenceTypeModel);
    res.status(200).json(result);
}

const ExpenceTypeList = async (req, res) => {
    let SeachRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let SearchArray = [{ Name : SeachRgx}];
    let result = await ListService(req, ExpenceTypeModel, SearchArray);
    res.status(200).json(result);
}


const DetailByIdExpenceType = async (req, res) => {
    let result = await DetailById(req, ExpenceTypeModel);
    res.status(200).json(result);
}



const DropDownExpenceType = async (req, res) => {
    let result = await DropDownService(req, ExpenceTypeModel,{_id:1, Name:1});
    res.status(200).json(result);
}

const DeleteExpenceType = async (req, res) => {
    let DeleteId = req.params.id;
    
    let CheackAssociteExpense = await CheckAssociationService( {TypeId:DeleteId}, ExpenseModel );
    if(CheackAssociteExpense){
        res.status(200).json({status : false, message : "This record is associated with Expense."});
    }else {
        let result = await DeleteService(req, ExpenceTypeModel);
        res.status(200).json(result);
    }

}
export {
    CreateExpenceType,
    UpdateExpenceType,
    ExpenceTypeList,
    DropDownExpenceType,
    DeleteExpenceType,
    DetailByIdExpenceType
}