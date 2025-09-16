import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    UserEmail : {type:String},
    Name : {type:String, required:true,unique:true},
    CreatedDate : {type:Date, default:Date.now()},


},{versionKey:false});
const ExpenceTypeModel = mongoose.model("expensetypes", DataSchema);
export default ExpenceTypeModel;