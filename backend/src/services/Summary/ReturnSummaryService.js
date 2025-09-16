import ReturnsModel from "../../model/Return/ReturnsModel.js";

export const ReturnSummaryService = async (req, res) => {
    try {
        let UserEmail = req.headers['email'];

        let data = await ReturnsModel.aggregate([
            { $match: { UserEmail: UserEmail } },

            {
                $facet:{
                    
                        Total : [
                            {
                                $group: {
                                    _id: 0,
                                    TotalAmount: { $sum: "$GrandTotal"}
                                }
                            }
                        ],

                        Last30Days : [
                            {
                                $group :{
                                    _id :{$dateToString: { format: "%Y-%m-%d", date: "$CreatedDate" } },
                                    TotalAmount: { $sum: "$GrandTotal"}
                                }
                            },
                            { $sort: { _id: -1 } },
                            { $limit: 30}
                        ]
                    
            }
                    
                
            }


        ])

         return {status: "success", data: data}
        
    } catch (error) {
        return {status: "failed", message: error.message}
        
    }

}
export default ReturnSummaryService;