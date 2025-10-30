import ProductModel from "../../model/Products/ProductModel.js";
import CreateService from "../../services/CommonService/CreateService.js";
import UpdateService from "../../services/CommonService/UpdateService.js";
import ListTwoJoinService from "../../services/CommonService/ListTwoJoinService.js";
import ReturnsModel from "../../model/Return/ReturnsModel.js";
import SalesModel from "../../model/Sales/SalesModel.js";
import PurchaseModel from "../../model/Purchases/PurchasesModel.js";
import DeleteService from "../../services/CommonService/DeleteService.js";
import CheckAssociationService from "../../services/CommonService/CheckAssociationService.js";
import DetailById from "../../services/CommonService/DetailByIdService.js";
import DropDownService from "../../services/CommonService/DropDownService.js";




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

const DetailProduct = async (req, res) => {
    let result = await DetailById(req, ProductModel);
    res.status(200).json(result);
}

const DeleteProduct = async (req, res) =>  {
    let DeleteId = req.params.id;
    
    let AssociationReturn = await CheckAssociationService({ProductId: DeleteId},ReturnsModel);
    let AssociationSales = await CheckAssociationService({ProductId: DeleteId},SalesModel);
    let AssociationPurchase = await CheckAssociationService({ProductId: DeleteId},PurchaseModel);

    if(AssociationReturn){
        res.status(200).json({status:"error", message:"This Product is associated with Return(s). You cannot delete this Product."});

    }else if(AssociationSales){
        res.status(200).json({status:"error", message:"This Product is associated with Sale(s). You cannot delete this Product."});
    }else if (AssociationPurchase){
        res.status(200).json({status:"error", message:"This Product is associated with Purchase(s). You cannot delete this Product."});
    }
    else{
        let result = await DeleteService(req, ProductModel);
        res.status(200).json(result);
    }


}


const ProductDropdown = async (req, res) => {
    let Result = await DropDownService(req,ProductModel, {_id:1, Name:1});
    res.status(200).json(Result);
}

    

export {
    CreateProduct,
    UpdateProduct,
    ListProduct,
    DeleteProduct,
    DetailProduct,
    ProductDropdown
}