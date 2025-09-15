import mongoose from "mongoose";
const DataSchema = new mongoose.Schema({
        UserEmail : { type: String},
        SalesId : {type : mongoose.Schema.Types.ObjectId, ref: 'sales'},
        ProductId : {type : mongoose.Schema.Types.ObjectId, ref: 'products'},
        Qty : {type : Number},
        UnitCost : {type : Number},
        Total: {type : Number},
        CreatedDate : {type : Date, default: Date.now()},
    

},{versionKey:false});
    const SalesProductModel = mongoose.model("salesproducts", DataSchema);
    export default SalesProductModel;