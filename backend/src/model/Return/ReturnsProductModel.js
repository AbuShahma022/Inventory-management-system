import mongoose from "mongoose";
const DataSchema = new mongoose.Schema({
    UserEmail : { type: String},
            ReturnId : {type : mongoose.Schema.Types.ObjectId, ref: 'returns'},
            ProductId : {type : mongoose.Schema.Types.ObjectId, ref: 'products'},
            Qty : {type : Number},
            UnitCost : {type : Number},
            Total: {type : Number},
            CreatedDate : {type : Date, default: Date.now()},
        

},{versionKey:false});
const ReturnsProductModel = mongoose.model("returnsproducts", DataSchema);
export default ReturnsProductModel;