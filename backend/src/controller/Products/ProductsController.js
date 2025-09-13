import ProductModel from "../../model/Products/ProductModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListTwoJoinService from "../../services/CommonService/ListTwoJoinService.js";


const CreateProduct = async (req, res) => {
    let result = await CreateService(req, ProductModel);
    res.status(200).json(result);
}

const UpdateProduct = async (req, res) => {
    let result = await UpdateService(req, ProductModel);
    res.status(200).json(result);
}

const ListProduct = async (req, res) => {
    let SearchRgx ={"$regex": req.params.searchKeyword, "$options": "i"};
    let JoinStage1 = {$lookup: {from:"brands",localField:"BrandId",foreignField:"_id",as:"Brands"}};
    let JoinStage2 = {$lookup: {from:"categories",localField:"CategoryId",foreignField:"_id",as:"Category"}};
    let SearchArray = [{"Name":SearchRgx},{"Unit":SearchRgx},{"Brands.Name":SearchRgx},{"Category.Name":SearchRgx}];
    let result = await ListTwoJoinService(req,ProductModel,SearchArray,JoinStage1,JoinStage2);
    res.status(200).json(result);
}

export {
    CreateProduct,
    UpdateProduct,
    ListProduct
}