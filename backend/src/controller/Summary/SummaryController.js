import ExpenceSummaryService from "../../services/Summary/ExpenceSummaryService.js";
import PurchaseSummaryService from "../../services/Summary/PurchaseSummaryService.js";
import ReturnSummaryService from "../../services/Summary/ReturnSummaryService.js";
import SalesSummaryService from "../../services/Summary/SalesSummaryService.js";


const ExpenceSummaryController = async (req, res) => {
    let Result = await ExpenceSummaryService(req);
    res.status(200).json(Result);
}

const PurchaseSummaryController = async (req, res) => {
    let Result = await PurchaseSummaryService(req);
    res.status(200).json(Result);
}

const ReturnSummaryController = async (req,res)=>{
    let Result = await ReturnSummaryService(req);
    res.status(200).json(Result);
}

const SalesSummaryController = async (req,res)=>{
    let Result = await SalesSummaryService(req)
    res.status(200).json(Result);

}



export {
    ExpenceSummaryController,
    PurchaseSummaryController,
    ReturnSummaryController,
    SalesSummaryController

}