import ExpenseModel from "../../model/Expences/ExpenseModel.js";

export const ExpenceSummaryService = async (req, res) => {
    try {
        let UserEmail = req.headers['email'];

        let data = await ExpenseModel.aggregate([
            { $match: { UserEmail: UserEmail } },

            {
                $facet:{
                    
                        Total : [
                            {
                                $group: {
                                    _id: 0,
                                    TotalAmount: { $sum: "$Amount"}
                                }
                            }
                        ],

                        Last30Days : [
                            {
                                $group :{
                                    _id :{$dateToString: { format: "%Y-%m-%d", date: "$CreatedDate" } },
                                    TotalAmount: { $sum: "$Amount"}
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
export default ExpenceSummaryService;