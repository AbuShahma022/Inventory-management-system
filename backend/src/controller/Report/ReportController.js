import ExpenseReportService from "../../services/Report/expenceReport.js";
import PurchaseReport from "../../services/Report/PurchaseReport.js";
import ReturnReport from "../../services/Report/ReturnReport.js";
import SalesReport from "../../services/Report/SalesReport.js";

 const ExpenseByDate = async (req, res) => {
    let result = await ExpenseReportService(req);
    return res.status(200).json(result);
}

const PurchaseByDate = async (req, res) => {
    let result = await PurchaseReport(req);
    return res.status(200).json(result);
}

const ReturnByDate = async (req, res) => {
    let result = await ReturnReport(req);
    return res.status(200).json(result);
}

const SalesByDate = async (req, res) => {
    let result = await SalesReport(req);
    return res.status(200).json(result);
}
export { ExpenseByDate
, PurchaseByDate,
    ReturnByDate,
    SalesByDate
 };