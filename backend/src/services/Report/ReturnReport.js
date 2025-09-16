import ReturnsProductModel from "../../model/Return/ReturnsProductModel.js";

const ReturnReport = async (req) => {
    try {
         let UserEmail = req.headers["email"];
        let fromDate = req.body.fromDate;
        let toDate = req.body.toDate;
         let data = await ReturnsProductModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } } },

            {
                $facet:{
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: { $sum: "$Total" }
                            }
                        }
                    ],
                    Rows: [
                        {$lookup:{from:"products", localField:"ProductId", foreignField:"_id", as:"Products"}},
                        {$unwind:"$Products"},
                        {$lookup:{from: "brands", localField:"Products.BrandId", foreignField:"_id", as:"Brand"}},
                        {$lookup:{from: "categories", localField:"Products.CategoryId", foreignField:"_id", as:"Category"}},



]
                       

}
}])
        return {Status : "success", data : data}
        
    } catch (error) {
        
    }
}
export default ReturnReport;