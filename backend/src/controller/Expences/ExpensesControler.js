import ExpenseModel from "../../model/Expences/ExpenseModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListOneService from "../../services/CommonService/ListOneService.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";

const CreateExpense = async (req, res) => {
    let result = await CreateService(req, ExpenseModel);
    res.status(200).json(result);
}
const UpdateExpense = async (req, res) => {
    let result = await UpdateService(req, ExpenseModel);
    res.status(200).json(result);
}

const ExpenseList = async (req, res) => {
    let SeachRgx = {"$regex": req.params.searchKeyword, "$options": "i"};
    let SearchArray =[{"Note" : SeachRgx},{"Amount" : SeachRgx},{"type.Name" : SeachRgx}];
    let JoinStage ={$lookup: {from : "expencetypes", localField: "TypeId", foreignField: "_id", as: "type"}};

    let result = await ListOneService(req, ExpenseModel, SearchArray, JoinStage);
    res.status(200).json(result);
}

const DetailByIdExpense = async (req, res) => {
    let result = await DetailById(req, ExpenseModel);
    res.status(200).json(result);
}
const DeleteExpense = async (req, res) => {
    let result = await DeleteService(req, ExpenseModel);
    res.status(200).json(result);
}
export{
    CreateExpense,
    UpdateExpense,
    ExpenseList,
    DeleteExpense,
    DetailByIdExpense
}