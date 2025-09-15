import SalesModel from "../../model/Sales/SalesModel.js";
import SalesProductModel from "../../model/Sales/SalesProductModel.js";
import CreateParentChildService from "../../services/CommonService/CreateParentChildService.js";
import ListOneService from "../../services/CommonService/ListOneService.js";
import DeleteParentChildService from "../../services/CommonService/DeleteParentChildService.js";
const CreateSales = async (req, res) => {
    
        let result = await CreateParentChildService(req, SalesModel, SalesProductModel, "SalesId");
        return res.status(200).json(result);
        
}

const SalesList = async (req, res) => {
    let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
    let JoinStage = {$lookup: {from: "customers", localField: "CustomerId", foreignField: "_id", as: "Customers"}};
    let SearchArray = [{"Note": SearchRgx},{"Customers.Name": SearchRgx},{"Customers.Phone": SearchRgx},{"Customers.Email": SearchRgx}];
    let result = await ListOneService(req, SalesModel, SearchArray,JoinStage);
    return res.status(200).json(result);
}
const DeleteSales = async (req,res)=>{
    let result = await DeleteParentChildService(req,SalesModel,SalesProductModel,"SalesId");
    res.status(200).json(result);
}

export {
    CreateSales,
    SalesList,
    DeleteSales
}