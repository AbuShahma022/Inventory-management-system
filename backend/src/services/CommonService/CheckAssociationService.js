const CheckAssociationService = async (QueryObject,AssociationModel) => {
    try {
        let data = await AssociationModel.aggregate(
            {
                $match : QueryObject
            }
        )
        return data.length > 0
        
    } catch (error) {
        return false;
        
    }
    
}
export default CheckAssociationService;