import ExpenceTypeModel from "../../model/Expences/ExpenceTypeModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListService from "../../services/CommonService/ListService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";


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

const DropDownExpenceType = async (req, res) => {
    let result = await DropDownService(req, ExpenceTypeModel,{_id:1, Name:1});
    res.status(200).json(result);
}

export {
    CreateExpenceType,
    UpdateExpenceType,
    ExpenceTypeList,
    DropDownExpenceType
}