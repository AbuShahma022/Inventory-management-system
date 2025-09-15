import mongoose from "mongoose";
const DataSchema = new mongoose.Schema({
            UserEmail: { type: String},
            CustomerId : {type : mongoose.Schema.Types.ObjectId, ref: 'customers'},
            VatTax : {type : Number},
            Discount : {type : Number},
            OtherCost : {type : Number},
            ShippingCost : {type : Number},
            GrandTotal : {type : Number},
            Note : {type : String},
            CreatedDate : {type : Date, default: Date.now()},

},{versionKey:false});
   const ReturnsModel = mongoose.model("returns", DataSchema);
    export default ReturnsModel;