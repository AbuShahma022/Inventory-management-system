import mongoose, { version } from "mongoose";
const DataSchema = mongoose.Schema({
    UserEmail : {type:String},
    Name : {type:String, required:true},
    CreatedDate : {type:Date, default:Date.now()},


},{versionKey:false});
const ExpenceTypeModel = mongoose.model("expencetypes", DataSchema);
export default ExpenceTypeModel;