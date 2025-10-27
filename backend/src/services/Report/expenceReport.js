import ExpenseModel from "../../model/Expences/ExpenseModel.js";

const ExpenseReport = async (req) => {
    try {
        let UserEmail = req.headers["email"];
        let fromDate = req.body.fromDate;
        let toDate = req.body.toDate;

       let data = await ExpenseModel.aggregate([
        { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } } },
        {
            $facet:{
                Total : [{
                    $group : {
                        _id : 0,
                        TotalAmount : { $sum : "$Amount"}
                    }
                }],
                Rows: [
    {
        $lookup: {
            from: "expensetypes",       // collection name
            localField: "TypeId",       // field in ExpenseModel
            foreignField: "_id",        // field in expencetypes collection
            as: "Type"                  // alias
        }
    }
]
            }
        }
 ])

 return {Status : "success", data : data}


        
    } catch (error) {
        return { Status: "fail", message: error.message };
        
    }

}
export default ExpenseReport;