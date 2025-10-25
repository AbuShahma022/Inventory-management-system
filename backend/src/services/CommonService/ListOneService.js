const ListOneService = async (req,DataModel,SearchArray,JoinStage)=>{
    try {
        let UserEmail = req.headers["email"];
        let PageNo = Number(req.params.pageNo) || 1;
        let PerPage = Number(req.params.perPage) || 10;
        let SearchKey = req.params.searchKeyword || "";
        

        let skipRow = (PageNo - 1) * PerPage;

     


        let data;

        if(SearchKey !== "0"){
            let SearchQueary = {$or: SearchArray};
            data = await DataModel.aggregate([
                {$match: {UserEmail : UserEmail}},
                JoinStage,
                {$match: SearchQueary},
                
               {
                $facet: {
                    Total: [{ $count: "count" }],
                    Rows:[{$skip: skipRow}, {$limit: PerPage }]
                }
               }
            ])

        } else {
            data = await DataModel.aggregate([
                {$match: {UserEmail : UserEmail}},
                JoinStage,
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows:[{$skip: skipRow}, {$limit: PerPage }]
                    }
                }
            ])
        }
        return {status: "success", data: data}

        
    } catch (error) {
        return {status: "failed", data: error.toString()}
        
    }
}
export default ListOneService;