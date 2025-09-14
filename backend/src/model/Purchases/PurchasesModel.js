import mongoose from "mongoose";
 const DataSchema = new mongoose.Schema({
    UserEmail: { type: String},
    SupplierId : {type : mongoose.Schema.Types.ObjectId, ref: 'suppliers'},
    VatTax : {type : Number},
    Discount : {type : Number},
    OtherCost : {type : Number},
    ShippingCost : {type : Number},
    GrandTotal : {type : Number},
    Note : {type : String},
    CreatedDate : {type : Date, default: Date.now()},
    
 },{versionKey:false});
    const PurchasesModel = mongoose.model("purchases", DataSchema);
    export default PurchasesModel;