import ReturnModel from '../../model/Return/ReturnsModel.js';
import ReturnProductModel from '../../model/Return/ReturnsProductModel.js';
import CreateParentChildService from '../../services/CommonService/CreateParentChildService.js';
import ListOneService from '../../services/CommonService/ListOneService.js';
import DeleteParentChildService from '../../services/CommonService/DeleteParentChildService.js';

const CreateReturn = async (req, res) => {
    let result = await CreateParentChildService(req, ReturnModel, ReturnProductModel, "ReturnId");
    return res.status(200).json(result);
}

const ReturnList = async (req, res) => {
    let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
    let JoinStage = { $lookup: { from: "customers", localField: "CustomerId", foreignField: "_id", as: "Customers" } };
    let SearchArray = [{ "Note": SearchRgx }, { "Customers.Name": SearchRgx }, { "Customers.Phone": SearchRgx }, { "Customers.Email": SearchRgx }];
    let result = await ListOneService(req, ReturnModel, SearchArray, JoinStage);
    return res.status(200).json(result);
}

const DeleteReturn = async (req, res) => {
    let result = await DeleteParentChildService(req, ReturnModel, ReturnProductModel, "ReturnId");
    return res.status(200).json(result);
}
export {
    CreateReturn,
    ReturnList,
    DeleteReturn
}