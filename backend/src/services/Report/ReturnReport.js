import ReturnsProductModel from "../../model/Return/ReturnsProductModel.js";

const ReturnReport = async (req) => {
     try{
        let UserEmail=req.headers['email'];
        let FormDate=  req.body['fromDate']
        let ToDate=  req.body['toDate']

        let data=await  ReturnsProductModel.aggregate([
            {$match: {UserEmail:UserEmail,CreatedDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}}},
            {
                $facet:{
                    Total:[{
                        $group:{
                            _id:0,
                            TotalAmount:{$sum:"$Total"}
                        }
                    }],
                    Rows:[
                        {$lookup: {from: "products", localField: "ProductId", foreignField: "_id", as: "products"}},
                        {$unwind : "$products" },
                        {$lookup: {from: "brands", localField: "products.BrandId", foreignField: "_id", as: "brands"}},
                        {$lookup: {from: "categories", localField: "products.CategoryId", foreignField: "_id", as: "categories"}}
                    ],
                }
            }


        ])
        return {status: "success", data: data}

    }

    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
export default ReturnReport;