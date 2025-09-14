import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    UserEmail : { type: String},
    PurchaseId : {type : mongoose.Schema.Types.ObjectId, ref: 'purchases'},
    ProductId : {type : mongoose.Schema.Types.ObjectId, ref: 'products'},
    Qty : {type : Number},
    UnitCost : {type : Number},
    Total: {type : Number},
    CreatedDate : {type : Date, default: Date.now()},

},{versionKey:false});
    const PurchaseProductModel = mongoose.model("purchaseproducts", DataSchema);
    export default PurchaseProductModel;